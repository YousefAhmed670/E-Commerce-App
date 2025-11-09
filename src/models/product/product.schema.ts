import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export enum DiscountType {
  percentage = 'percentage',
  fixedAmount = 'fixedAmount',
}
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Product {
  readonly _id: Types.ObjectId;
  @Prop({ type: String, required: true, trim: true })
  name: string;
  @Prop({ type: String, required: true, trim: true, unique: true })
  slug: string;
  @Prop({ type: String, required: true, trim: true })
  description: string;
  @Prop({ type: Number, required: true, min: 1 })
  price: number;
  @Prop({ type: Number, default: 0, min: 0 })
  discountAmount: number;
  @Prop({ type: String, enum: DiscountType, default: DiscountType.fixedAmount })
  discountType: DiscountType;
  @Virtual({
    get: function (this: Product) {
      if (this.discountType == DiscountType.fixedAmount) {
        return this.price - this.discountAmount;
      } else {
        return this.price - (this.price * this.discountAmount) / 100;
      }
    },
  })
  finalPrice: number;
  @Prop({ type: Number, default: 1, min: 0 })
  stock: number;
  @Prop({ type: Number, default: 5, min: 0, max: 5 })
  rating: number;
  @Prop({ type: Number, default: 0, min: 0 })
  sold: number;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Brand', required: true })
  brandId: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  updatedBy: Types.ObjectId;
  @Prop({ type: [String] })
  colors: string[];
  @Prop({ type: [String] })
  sizes: string[];
}
export const ProductSchema = SchemaFactory.createForClass(Product);
