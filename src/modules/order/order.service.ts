import { OrderRepository, ProductRepository } from '@/models';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Types } from 'mongoose';
import { CartService } from '../cart/cart.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly cartService: CartService,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
  ) {}
  async create(createOrderDto: CreateOrderDto, user: any) {
    const cart = await this.cartService.getCart(user);
    if (cart.products.length === 0) {
      throw new NotFoundException('Cart is empty');
    }
    const failedProducts: { productId: Types.ObjectId; message: string }[] = [];
    const successProducts: {
      productId: Types.ObjectId;
      quantity: number;
      price: number;
      discountAmount: number;
      total: number;
    }[] = [];
    for (const product of cart.products) {
      const productExist = await this.productRepository.getOne({
        _id: product.productId,
      });
      if (!productExist) {
        failedProducts.push({
          productId: product.productId,
          message: 'Product not found',
        });
        continue;
      }
      if (productExist.stock < product.quantity) {
        failedProducts.push({
          productId: product.productId,
          message: 'Product stock is not enough',
        });
        continue;
      }
      successProducts.push({
        productId: product.productId,
        quantity: product.quantity,
        price: productExist.finalPrice,
        discountAmount: productExist.discountAmount,
        total: productExist.finalPrice * product.quantity,
      });
    }
    if (failedProducts.length > 0) {
      return failedProducts;
    }
    let totalAmount = successProducts.reduce(
      (acc, product) => acc + product.total,
      0,
    );
    if (createOrderDto.couponDetails) {
      const coupon = createOrderDto.couponDetails;
      if (coupon.discountType === 'fixedAmount') {
        totalAmount -= coupon.discountAmount;
      } else {
        totalAmount -= (coupon.discountAmount / 100) * totalAmount;
      }
    }
    const order = await this.orderRepository.create({
      userId: user._id,
      products: successProducts,
      address: createOrderDto.address,
      paymentMethod: createOrderDto.paymentMethod,
      coupon: createOrderDto.couponDetails,
      totalAmount,
    });
    await this.cartService.clearCart(user);
    return order;
  }

  async remove(user: any): Promise<DeleteResult> {
    return await this.orderRepository.delete({ userId: user._id });
  }
}
