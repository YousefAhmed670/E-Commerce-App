import { Coupon, CouponRepository, couponSchema } from '@/models';
import { UserMongoModule } from '@/shared';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { CouponFactoryService } from './factory';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([{ name: Coupon.name, schema: couponSchema }]),
  ],
  controllers: [CouponController],
  providers: [CouponService, CouponFactoryService, CouponRepository],
})
export class CouponModule {}
