import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class CartProduct {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;
  @Prop({ type: Number, default: 1 })
  quantity: number;
}
@Schema({ timestamps: true })
export class Cart {
  readonly _id: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
  @Prop({ type: [CartProduct], default: [] })
  products: CartProduct[];
}
export const CartSchema = SchemaFactory.createForClass(Cart);
