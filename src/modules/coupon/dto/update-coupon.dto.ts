import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponDto } from './create-coupon.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {}

export class FindAllCouponDto {
  @IsString()
  @IsOptional()
  limit: string;
  @IsString()
  @IsOptional()
  page: string;
}
