import { Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDto } from './dto/add-to-cart-dto';
import { ProductService } from '../product/product.service';
import { CartRepository } from '@/models';
import { MESSAGE } from '@/common';
import { Types } from 'mongoose';

@Injectable()
export class CartService {
  constructor(
    private readonly productService: ProductService,
    private readonly cartRepository: CartRepository,
  ) {}
  async createCart(addToCartDto: AddToCartDto, user: any) {
    const newCart = await this.cartRepository.create({
      userId: user.id,
      products: [
        {
          productId: addToCartDto.productId,
          quantity: addToCartDto.quantity,
        },
      ],
    });
    return newCart;
  }
  async getCart(user: any) {
    const cart = await this.cartRepository.getOne(
      { userId: user._id },
      {},
      {
        populate: [
          { path: 'products.productId' },
          { path: 'userId', select: 'userName email' },
        ],
      },
    );
    if (!cart) {
      throw new NotFoundException(MESSAGE.cart.notFound);
    }
    return cart;
  }
  async addToCart(addToCartDto: AddToCartDto, user: any) {
    await this.productService.findOne(addToCartDto.productId);
    const cart = await this.cartRepository.getOne({ userId: user._id });
    if (!cart) {
      return await this.createCart(addToCartDto, user);
    }
    const productIndex = cart.products.findIndex((product) =>
      product.productId.equals(addToCartDto.productId),
    );
    if (productIndex == -1) {
      cart.products.push({
        productId: addToCartDto.productId,
        quantity: addToCartDto.quantity,
      });
    } else {
      if (addToCartDto.quantity == 0) {
        return await this.removeFromCart(addToCartDto.productId, user);
      }
      cart.products[productIndex].quantity = addToCartDto.quantity;
    }
    await cart.save();
    return cart;
  }
  async removeFromCart(productId: string | Types.ObjectId, user: any) {
    const product = await this.cartRepository.update(
      { userId: user._id, 'products.productId': productId },
      { $pull: { products: { productId } } },
    );
    if (!product) {
      throw new NotFoundException(MESSAGE.product.notFound);
    }
    return true;
  }
  async clearCart(user: any) {
    await this.cartRepository.update(
      { userId: user._id },
      { $set: { products: [] } },
    );
    return true;
  }
}
