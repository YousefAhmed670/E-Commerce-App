import { Gender, UserAgent } from '@/models';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  userName: string;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ValidateIf((user) => user.userAgent === UserAgent.LOCAL || !user.userAgent)
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password?: string;
  @IsString()
  @Length(11, 11, { message: 'Phone number must be 11 digits' })
  @IsOptional()
  phoneNumber?: string;
  @IsString()
  @IsOptional()
  @IsEnum(Gender)
  gender?: string;
}
