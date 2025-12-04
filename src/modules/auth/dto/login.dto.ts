import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './register.dto';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto extends PartialType(RegisterDto) {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
