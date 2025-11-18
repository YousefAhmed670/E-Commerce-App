import { CreateCouponDto } from '../dto/create-coupon.dto';
import { UpdateCouponDto } from '../dto/update-coupon.dto';
import { Coupon } from '../entities/coupon.entity';

export class CouponFactoryService {
  createCoupon(createCouponDto: CreateCouponDto, user: any) {
    const coupon = new Coupon();
    coupon.code = createCouponDto.code;
    coupon.discountAmount = createCouponDto.discountAmount;
    coupon.discountType = createCouponDto.discountType;
    coupon.startDate = createCouponDto.startDate;
    coupon.endDate = createCouponDto.endDate;
    coupon.isActive = createCouponDto.isActive;
    coupon.createdBy = user._id;
    coupon.updatedBy = user._id;
    coupon.usedBy = [];
    coupon.assignedTo = createCouponDto.assignedTo?.map((id) => ({
      customerId: id,
      count: 0,
    })) || [];
    coupon.totalUsed = 0;
    return coupon;
  }
  updateCoupon(updateCouponDto: UpdateCouponDto, user: any) {
    const coupon = new Coupon();
   if(updateCouponDto.code) coupon.code = updateCouponDto.code;
   if(updateCouponDto.discountAmount) coupon.discountAmount = updateCouponDto.discountAmount;
   if(updateCouponDto.discountType) coupon.discountType = updateCouponDto.discountType;
   if(updateCouponDto.startDate) coupon.startDate = updateCouponDto.startDate;
   if(updateCouponDto.endDate) coupon.endDate = updateCouponDto.endDate;
   if(updateCouponDto.isActive) coupon.isActive = updateCouponDto.isActive;
    coupon.updatedBy = user._id;
    coupon.totalUsed = 0;
    return coupon;
  }
}
