import { DiscountType } from '@/models';
import { Types } from 'mongoose';

export class Product {
  readonly _id: Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountAmount: number;
  discountType: DiscountType;
  finalPrice: number;
  stock: number;
  rating: number;
  sold: number;
  categoryId: Types.ObjectId;
  brandId: Types.ObjectId;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  colors: string[];
  sizes: string[];
}
