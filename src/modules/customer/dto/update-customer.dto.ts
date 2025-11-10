import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export class RequestEmailUpdateDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  newEmail: string;
}

export class UpdateEmailDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  newEmail: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;
}
