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
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart-dto';

@Controller('cart')
@Auth('Customer', 'Admin')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() addToCartDto: AddToCartDto, @User() user: any) {
    const cart = await this.cartService.addToCart(addToCartDto, user);
    return {
      message: MESSAGE.cart.updated,
      success: true,
      data: cart,
    };
  }

  @Put('remove/:productId')
  async removeFromCart(
    @Param('productId') productId: string,
    @User() user: any,
  ) {
    await this.cartService.removeFromCart(productId, user);
    return {
      message: MESSAGE.cart.updated,
      success: true,
    };
  }

  @Delete()
  async clearCart(@User() user: any) {
    await this.cartService.clearCart(user);
    return {
      message: MESSAGE.cart.updated,
      success: true,
    };
  }

  @Get()
  async showCart(@User() user: any) {
    const cart = await this.cartService.getCart(user);
    return {
      message: MESSAGE.cart.found,
      success: true,
      data: cart,
    };
  }
}
