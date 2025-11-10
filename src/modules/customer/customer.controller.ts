import { Auth, MESSAGE, User } from '@/common';
import { Body, Controller, Delete, Get, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import {
  RequestEmailUpdateDto,
  UpdateCustomerDto,
  UpdateEmailDto,
} from './dto/update-customer.dto';
import { userFactoryService } from './factory';

@Controller('customer')
@Auth('Customer', 'Admin', 'Seller')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly userFactoryService: userFactoryService,
  ) {}
  @Get()
  getProfile(@User() user: any) {
    const { password, otp, otpExpiry, ...restUser } = JSON.parse(
      JSON.stringify(user),
    );
    return {
      message: MESSAGE.profile.found,
      success: true,
      data: { user: restUser },
    };
  }

  @Put()
  async update(
    @User() user: any,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const customer = this.userFactoryService.updateCustomer(updateCustomerDto);
    const updatedCustomer = await this.customerService.update(user, customer);
    const { password, otp, otpExpiry, ...restUser } = JSON.parse(
      JSON.stringify(updatedCustomer),
    );
    return {
      message: MESSAGE.profile.updated,
      success: true,
      data: { user: restUser },
    };
  }

  @Put('request-email-update')
  async requestEmailUpdate(
    @User() user: any,
    @Body() newEmail: RequestEmailUpdateDto,
  ) {
    await this.customerService.requestEmailUpdate(user, newEmail);
    return {
      message: 'OTP sent successfully to your email',
      success: true,
    };
  }

  @Put('update-email')
  async updateEmail(@User() user: any, @Body() updateEmailDto: UpdateEmailDto) {
    await this.customerService.updateEmail(user, updateEmailDto);
    return {
      message: 'Email updated successfully',
      success: true,
    };
  }

  @Delete()
  async remove(@User() user: any) {
    await this.customerService.remove(user);
    return {
      message: MESSAGE.profile.deleted,
      success: true,
    };
  }
}
