import { Auth } from '@/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
@Auth('Customer', 'Admin')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get()
  getProfile(@Req() req) {
    return {
      message: 'Profile fetched successfully',
      success: true,
      data: { user: req.user },
    };
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
