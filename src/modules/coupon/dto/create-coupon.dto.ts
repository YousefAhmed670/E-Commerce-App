import { IsValidDiscount, IsValidEndDate } from '@/common';
import { DiscountType } from '@/common/types';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinDate,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 8)
  code: string;
  @IsValidDiscount()
  @IsOptional()
  discountAmount: number;
  @IsString()
  @IsEnum(DiscountType)
  @IsOptional()
  discountType: DiscountType;
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  @MinDate(new Date(Date.now() - 24 * 60 * 60 * 1000))
  startDate: Date;
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  @IsValidEndDate()
  endDate: Date;
  @IsBoolean()
  isActive: boolean;
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  assignedTo: Types.ObjectId[];
}
