import {
  cryptPhone,
  generateExpiry,
  generateOtp,
  hash,
} from '@/common/utilities';
import { RegisterDto } from '../dto/register.dto';
import { Customer } from '../entities/auth.entity';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AuthFactoryService {
  async createCustomer(registerDto: RegisterDto): Promise<Customer> {
    const customer = new Customer();
    customer.userName = registerDto.userName;
    customer.email = registerDto.email;
    customer.password = await hash(registerDto.password);
    customer.phoneNumber = cryptPhone(registerDto.phoneNumber as string);
    customer.gender = registerDto.gender as string;
    customer.otp = generateOtp();
    customer.otpExpiry = generateExpiry();
    customer.isVerified = false;
    customer.credentialUpdatedAt = new Date();
    return customer;
  }
}
