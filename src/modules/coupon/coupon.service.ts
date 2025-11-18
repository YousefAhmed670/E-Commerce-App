import { MESSAGE } from '@/common';
import { CouponRepository } from '@/models';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindAllCouponDto, UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { DeleteResult } from 'mongoose';

@Injectable()
export class CouponService {
  constructor(private readonly couponRepository: CouponRepository) {}
  async create(coupon: Coupon) {
    const couponExists = await this.couponRepository.getOne({
      code: coupon.code,
      isActive: true,
    });
    if (couponExists) {
      throw new ConflictException(MESSAGE.coupon.alreadyExists);
    }
    return await this.couponRepository.create(coupon);
  }

  async findAll(findAllCouponDto: FindAllCouponDto) {
    const { limit, page } = findAllCouponDto;
    const skip = (+page - 1) * +limit;
    return await this.couponRepository.getAll({}, {}, { limit: +limit, skip });
  }

  async findOne(id: string) {
    const couponExists = await this.couponRepository.getOne({ _id: id });
    if (!couponExists) {
      throw new NotFoundException(MESSAGE.coupon.notFound);
    }
    return couponExists;
  }

  async update(id: string, coupon: Partial<Coupon>) {
    const couponExists = await this.couponRepository.getOne({
      code: coupon.code,
    });
    if (couponExists && couponExists._id.toString() !== id) {
      throw new ConflictException(MESSAGE.coupon.alreadyExists);
    }
    await this.findOne(id);
    return await this.couponRepository.update({ _id: id }, coupon);
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.couponRepository.delete({ _id: id });
  }
}
