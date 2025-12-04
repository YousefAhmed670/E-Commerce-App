import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../abstract.repository';
import { Cart } from './cart.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CartRepository extends AbstractRepository<Cart> {
  constructor(@InjectModel(Cart.name) private readonly cartModel: Model<Cart>) {
    super(cartModel);
  }
}
