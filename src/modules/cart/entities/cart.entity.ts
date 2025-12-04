import { Types } from 'mongoose';

export class CartProduct {
  productId: Types.ObjectId;
  quantity: number;
}
export class Cart {
  readonly _id: Types.ObjectId;
  userId: Types.ObjectId;
  products: CartProduct[];
}
