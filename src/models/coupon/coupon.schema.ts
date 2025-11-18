import { DiscountType } from '@/common/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
@Schema({ timestamps: true })
export class CouponUsers {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  customerId: Types.ObjectId;
  @Prop({ type: Number })
  count: number;
}
@Schema({ timestamps: true })
export class Coupon {
  readonly _id: Types.ObjectId;
  @Prop({ type: String, required: true })
  code: string;
  @Prop({ type: Number, required: true })
  discountAmount: number;
  @Prop({ type: String, enum: DiscountType, default: DiscountType.fixedAmount })
  discountType: DiscountType;
  @Prop({ type: Date, required: true })
  startDate: Date;
  @Prop({ type: Date, required: true })
  endDate: Date;
  @Prop({ type: Boolean, default: true })
  isActive: boolean;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  updatedBy: Types.ObjectId;
  @Prop({ type: [CouponUsers], default: [] })
  usedBy: CouponUsers[];
  @Prop({ type: [CouponUsers], default: [] })
  assignedTo: CouponUsers[];
  @Prop({ type: Number, default: 0 })
  totalUsed: number;
}

export const couponSchema = SchemaFactory.createForClass(Coupon);
