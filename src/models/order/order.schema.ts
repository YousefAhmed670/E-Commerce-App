import { DiscountType, orderStatus, paymentMethod } from '@/common/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
@Schema()
export class OrderProduct {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;
  @Prop({ type: Number, required: true })
  quantity: number;
  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: Number })
  discountAmount?: number;
  @Prop({ type: String })
  discountType?: string;
  @Prop({ type: Number })
  total: number;
}
@Schema()
export class OrderAddress {
  @Prop({ type: String, required: true })
  street: string;
  @Prop({ type: String, required: true })
  city: string;
  @Prop({ type: String, required: true })
  country: string;
  @Prop({ type: String, required: true })
  phoneNumber: string;
}
@Schema()
export class CouponDetails {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Coupon', required: true })
  couponId: Types.ObjectId;
  @Prop({ type: String })
  couponCode: string;
  @Prop({ type: Number, default: 0 })
  discountAmount: number;
  @Prop({ type: String, enum: DiscountType, default: DiscountType.percentage })
  discountType: DiscountType;
}
@Schema({ timestamps: true })
export class Order {
  readonly _id: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
  @Prop({ type: OrderAddress, required: true })
  address: OrderAddress;
  @Prop({ type: [OrderProduct], required: true })
  products: OrderProduct[];
  @Prop({ type: String, enum: paymentMethod, default: paymentMethod.CASH })
  paymentMethod: paymentMethod;
  @Prop({
    type: String,
    enum: orderStatus,
    default: function () {
      return this.paymentMethod === paymentMethod.CASH
        ? orderStatus.PLACED
        : orderStatus.PENDING;
    },
  })
  status: orderStatus;
  @Prop({ type: CouponDetails })
  coupon?: CouponDetails;
  @Prop({ type: Number, required: true })
  totalAmount: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
