import { DiscountType } from '@/common/types';
import { CouponUsers } from '@/models';
import { Types } from 'mongoose';

export class Coupon {
  readonly _id: Types.ObjectId;
  code: string;
  discountAmount: number;
  discountType: DiscountType;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  usedBy: CouponUsers[];
  assignedTo: CouponUsers[];
  totalUsed: number;
}
