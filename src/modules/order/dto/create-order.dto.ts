import { DiscountType, paymentMethod } from '@/common/types';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

class AddressDto {
  @IsNotEmpty()
  @IsString()
  street: string;
  @IsNotEmpty()
  @IsString()
  city: string;
  @IsNotEmpty()
  @IsString()
  country: string;
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}
class CouponDetails {
  @IsMongoId()
  couponId: Types.ObjectId;
  @IsString()
  couponCode: string;
  @IsNumber()
  discountAmount: number;
  @IsEnum(DiscountType)
  discountType: DiscountType;
}
class ProductDto {
  @IsMongoId()
  productId: Types.ObjectId;
  @IsNumber()
  quantity: number;
}
export class CreateOrderDto {
  @IsObject()
  address: AddressDto;
  @IsString()
  @IsEnum(paymentMethod)
  @IsOptional()
  paymentMethod: paymentMethod;
  @IsObject()
  @IsOptional()
  couponDetails: CouponDetails;
  @IsArray()
  @IsOptional()
  products: ProductDto[];
}
