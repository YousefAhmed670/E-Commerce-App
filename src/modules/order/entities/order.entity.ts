import { DiscountType, orderStatus, paymentMethod } from '@/common/types';
import { Types } from 'mongoose';

export class OrderProduct {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
  discountAmount?: number;
  discountType?: DiscountType;
  total: number;
}
export class OrderAddress {
  street: string;
  city: string;
  country: string;
  phoneNumber: string;
}
export class CouponDetails {
  couponId: Types.ObjectId;
  couponCode: string;
  discountAmount: number;
  discountType: DiscountType;
}
export class Order {
  readonly _id: Types.ObjectId;
  userId: Types.ObjectId;
  address: OrderAddress;
  products: OrderProduct[];
  paymentMethod: paymentMethod;
  status: orderStatus;
  coupon?: CouponDetails;
  totalAmount: number;
}
