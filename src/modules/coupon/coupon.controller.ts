import { Auth, MESSAGE, Public, User } from '@/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { FindAllCouponDto, UpdateCouponDto } from './dto/update-coupon.dto';
import { CouponFactoryService } from './factory';

@Controller('coupon')
@Auth('Admin', 'Seller')
export class CouponController {
  constructor(
    private readonly couponService: CouponService,
    private readonly couponFactoryService: CouponFactoryService,
  ) {}

  @Post()
  async create(@Body() createCouponDto: CreateCouponDto, @User() user: any) {
    const coupon = this.couponFactoryService.createCoupon(
      createCouponDto,
      user,
    );
    const createdCoupon = await this.couponService.create(coupon);
    return {
      message: MESSAGE.coupon.created,
      success: true,
      data: createdCoupon,
    };
  }

  @Get()
  @Public()
  async findAll(@Query() findAllCouponDto: FindAllCouponDto) {
    const coupons = await this.couponService.findAll(findAllCouponDto);
    return {
      message: MESSAGE.coupon.found,
      success: true,
      data: coupons,
    };
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    const coupon = await this.couponService.findOne(id);
    return {
      message: MESSAGE.coupon.found,
      success: true,
      data: coupon,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCouponDto: UpdateCouponDto,
    @User() user: any,
  ) {
    const coupon = this.couponFactoryService.updateCoupon(
      updateCouponDto,
      user,
    );
    const updatedCoupon = await this.couponService.update(id, coupon);
    return {
      message: MESSAGE.coupon.updated,
      success: true,
      data: updatedCoupon,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.couponService.remove(id);
    return {
      message: MESSAGE.coupon.deleted,
      success: true,
    };
  }
}
