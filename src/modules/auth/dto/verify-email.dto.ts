import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class VerifyEmailDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  otp: string;
}

export class SendOtpDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  otp: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  confirmPassword: string;
}
