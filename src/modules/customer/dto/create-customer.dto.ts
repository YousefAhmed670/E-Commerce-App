import { Gender } from "@/models";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateCustomerDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  userName: string;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
  @IsString()
  @Length(11, 11, { message: 'Phone number must be 11 digits' })
  @IsOptional()
  phoneNumber?: string;
  @IsString()
  @IsOptional()
  @IsEnum(Gender)
  gender?: string;
}
