import { Body, Controller, Post, Put, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthFactoryService } from './factory';
import { ResetPasswordDTO, SendOtpDTO, VerifyEmailDTO } from './dto/verify-email.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFactoryService: AuthFactoryService,
  ) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const customer = await this.authFactoryService.createCustomer(registerDto);
    const createdCustomer = await this.authService.register(customer);
    return {
      message: 'User registered successfully',
      success: true,
      data: createdCustomer,
    };
  }

  @Post('/verify-email')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDTO) {
    await this.authService.verifyEmail(verifyEmailDto);
    return {
      message: 'User verified successfully',
      success: true,
    };
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const { token, refreshToken } = await this.authService.login(loginDto);
    return {
      message: 'User logged in successfully',
      success: true,
      data: { token, refreshToken },
    };
  }

  @Post('/refresh-token')
  async refreshToken(@Req() req) {
    const refreshToken = req.headers.refreshtoken;
    const { token, newRefreshToken } =
      await this.authService.refreshToken(refreshToken);
    return {
      message: 'User logged in successfully',
      success: true,
      data: { token, refreshToken: newRefreshToken },
    };
  }

  @Post("/send-otp")
  async sendOtp(@Body() sendOtpDto: SendOtpDTO) {
    await this.authService.sendOtp(sendOtpDto);
    return {
      message: 'OTP sent successfully',
      success: true,
    };
  }

  @Put("/reset-password")
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDTO) {
    await this.authService.resetPassword(resetPasswordDto);
    return {
      message: 'Password reset successfully',
      success: true,
    };
  }
}
