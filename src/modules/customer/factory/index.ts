import { Injectable } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { cryptPhone } from '@/common';
@Injectable()
export class userFactoryService {
  updateCustomer(updateCustomerDto: UpdateCustomerDto) {
    const customer = new Customer();
    customer.userName = updateCustomerDto.userName as string;
    customer.phoneNumber = cryptPhone(updateCustomerDto.phoneNumber as string);
    customer.gender = updateCustomerDto.gender as string;
    return customer;
  }
}
