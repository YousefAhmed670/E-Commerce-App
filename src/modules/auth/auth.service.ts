import {
  compareHash,
  eventEmitter,
  generateExpiry,
  generateOtp,
  hash,
} from '@/common/utilities';
import { CustomerRepository } from '@/models';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDTO, SendOtpDTO, VerifyEmailDTO } from './dto/verify-email.dto';
import { Customer } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async register(customer: Customer) {
    const customerExists = await this.customerRepository.getOne({
      email: customer.email,
    });
    if (customerExists) {
      throw new ConflictException('User already exists');
    }
    const createdCustomer = await this.customerRepository.create(customer);
    const { password, otp, otpExpiry, ...restCustomer } = JSON.parse(
      JSON.stringify(createdCustomer),
    );
    return restCustomer as Customer;
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDTO) {
    const { otp, email } = verifyEmailDto;
    const customerExist = await this.customerRepository.getOne({ email });
    if (!customerExist) {
      throw new NotFoundException('User not found');
    }
    if (
      customerExist?.otpExpiry &&
      customerExist.otpExpiry.getTime() < Date.now()
    ) {
      throw new BadRequestException('OTP expired');
    }
    if (!customerExist.otp || !(await compareHash(otp, customerExist.otp))) {
      throw new BadRequestException('Invalid OTP');
    }
    await this.customerRepository.update(
      { email },
      {
        $unset: { otp: '', otpExpiry: '' },
        $set: { isVerified: true },
      },
    );
    return true;
  }

  async login(loginDto: LoginDto) {
    const customerExist = await this.customerRepository.getOne({
      email: loginDto.email,
    });
    if (!customerExist) {
      throw new NotFoundException('User not found');
    }
    if (!customerExist.isVerified) {
      throw new BadRequestException('User not verified');
    }
    if (!(await compareHash(loginDto.password, customerExist.password))) {
      throw new BadRequestException('Invalid password');
    }
    const token = this.jwtService.sign(
      {
        _id: customerExist._id,
        email: customerExist.email,
        role: 'Customer',
      },
      {
        expiresIn: '1h',
        secret: this.configService.get('token.secret'),
      },
    );
    const refreshToken = this.jwtService.sign(
      {
        _id: customerExist._id,
        email: customerExist.email,
        role: 'Customer',
      },
      {
        expiresIn: '1d',
        secret: this.configService.get('token.refreshSecret'),
      },
    );
    return { token, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }
    const payload = this.jwtService.verify(refreshToken, {
      secret: this.configService.get('token.refreshSecret'),
    });
    const customerExist = await this.customerRepository.getOne({
      _id: payload._id,
    });
    if (!customerExist) {
      throw new NotFoundException('User not found');
    }
    const token = this.jwtService.sign(
      {
        _id: customerExist._id,
        email: customerExist.email,
        role: 'Customer',
      },
      {
        expiresIn: '1h',
        secret: this.configService.get('token.secret'),
      },
    );
    const newRefreshToken = this.jwtService.sign(
      {
        _id: customerExist._id,
        email: customerExist.email,
        role: 'Customer',
      },
      {
        expiresIn: '1d',
        secret: this.configService.get('token.refreshSecret'),
      },
    );
    return { token, newRefreshToken };
  }

  async sendOtp(sendOtpDto: SendOtpDTO) {
    const customerExist = await this.customerRepository.getOne({
      email: sendOtpDto.email,
    });
    if (!customerExist) {
      throw new NotFoundException('User not found');
    }
    if (
      customerExist.otp &&
      customerExist.otpExpiry &&
      customerExist.otpExpiry.getTime() > Date.now()
    ) {
      throw new BadRequestException(
        'OTP already sent. please wait before requesting again',
      );
    }
    if (customerExist.userAgent !== 'google') {
      const otp = generateOtp();
      const otpExpiry = generateExpiry();
      await this.customerRepository.update(
        { _id: customerExist._id },
        {
          $set: { otp, otpExpiry },
        },
      );
      eventEmitter.emit('sendOTP', { email: customerExist.email, otp });
      const hashedOtp = await hash(otp);
      await this.customerRepository.update(
        { _id: customerExist._id },
        {
          $set: { otp: hashedOtp },
        },
      );
    }
    return true;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDTO) {
    const customerExist = await this.customerRepository.getOne({
      email: resetPasswordDto.email,
    });
    if (!customerExist) {
      throw new NotFoundException('User not found');
    }
    if (
      customerExist?.otp &&
      customerExist?.otpExpiry &&
      customerExist?.otpExpiry.getTime() < Date.now()
    ) {
      throw new BadRequestException(
        'OTP expired. please request a new one',
      );
    }
    if (!customerExist.otp || !(await compareHash(resetPasswordDto.otp, customerExist.otp))) {
      throw new BadRequestException('Invalid OTP');
    }
    if (resetPasswordDto.password !== resetPasswordDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashedPassword = await hash(resetPasswordDto.password);
    await this.customerRepository.update(
      { _id: customerExist._id },
      {
        $set: { password: hashedPassword },
        $unset: { otp: '', otpExpiry: '' },
      },
    );
    return true;
  }
}
