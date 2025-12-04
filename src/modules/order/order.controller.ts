import { Auth, MESSAGE, User } from '@/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';

@Controller('order')
@Auth('Customer', 'Admin')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @User() user: any) {
    const result = await this.orderService.create(createOrderDto, user);
    if (result instanceof Array) {
      return {
        message: 'Some products failed to add to the order',
        success: false,
        data: result,
      };
    }
    return {
      message: MESSAGE.order.created,
      success: true,
      data: result,
    };
  }

  @Delete()
  async remove(@User() user: any) {
    await this.orderService.remove(user);
    return {
      message: MESSAGE.order.deleted,
      success: true,
    };
  }
}
