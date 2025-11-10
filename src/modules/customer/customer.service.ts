import { eventEmitter, generateExpiry, generateOtp, MESSAGE } from '@/common';
import { compareHash, hash } from '@/common/utilities/hash';
import { TokenRepository, UserRepository } from '@/models';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import {
  RequestEmailUpdateDto,
  UpdateEmailDto,
} from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async update(user: any, customer: Customer) {
    const updatedCustomer = await this.userRepository.update(
      { _id: user._id },
      customer,
    );
    return updatedCustomer;
  }

  async requestEmailUpdate(user: any, newEmail: RequestEmailUpdateDto) {
    const emailExist = await this.userRepository.getOne({
      email: newEmail.newEmail,
    });
    if (emailExist) {
      throw new ConflictException('Email already in use');
    }
    const otp = generateOtp();
    const otpExpiry = generateExpiry();
    const hashedOtp = await hash(otp);
    const updatedCustomer = await this.userRepository.update(
      { _id: user._id },
      { otp: hashedOtp, otpExpiry },
    );
    eventEmitter.emit('sendOTP', { email: newEmail.newEmail, otp });
    return updatedCustomer;
  }

  async updateEmail(user: any, updateEmailDto: UpdateEmailDto) {
    const emailExist = await this.userRepository.getOne({
      email: updateEmailDto.newEmail,
    });
    if (emailExist) {
      throw new ConflictException('Email already in use');
    }
    if (user.otpExpiry.getTime() < Date.now()) {
      throw new BadRequestException('OTP has expired');
    }
    const isOTPValid = await compareHash(updateEmailDto.otp, user.otp);
    if (!isOTPValid) {
      throw new BadRequestException('Invalid OTP');
    }
    const updatedCustomer = await this.userRepository.update(
      { _id: user._id },
      {
        email: updateEmailDto.newEmail,
        credentialUpdatedAt: new Date(),
        $unset: { otp: '', otpExpiry: '' },
      },
    );
    return updatedCustomer;
  }

  async remove(user: any) {
    if (user.isDeleted) {
      throw new ConflictException(MESSAGE.customer.alreadyDeleted);
    }
    await this.userRepository.update(
      { _id: user._id },
      {
        isDeleted: true,
        deletedAt: new Date(),
        credentialUpdatedAt: new Date(),
      },
    );
    await this.tokenRepository.deleteMany({ userId: user._id });
    return true;
  }
}
