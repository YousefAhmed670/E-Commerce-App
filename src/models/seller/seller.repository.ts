import { Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Injectable } from '@nestjs/common';
import { Seller } from './seller.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SellerRepository extends AbstractRepository<Seller> {
  constructor(@InjectModel(Seller.name) private readonly sellerModel: Model<Seller>) {
    super(sellerModel);
  }
}
