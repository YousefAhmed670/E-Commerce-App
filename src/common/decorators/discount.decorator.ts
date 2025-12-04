import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { DiscountType } from '../types';

export function IsValidDiscount(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidDiscount',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any;
          const { discountType } = obj;
          if (discountType === DiscountType.percentage) {
            return typeof value === 'number' && value >= 0 && value <= 100;
          }
          if (discountType === DiscountType.fixedAmount) {
            return typeof value === 'number' && value >= 0;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const obj = args.object as any;
          const { discountType } = obj;
          if (discountType === DiscountType.percentage) {
            return 'Discount must be a number between 0 and 100%';
          }
          if (discountType === DiscountType.fixedAmount) {
            return 'Discount must be a number greater than or equal to 0';
          }
          return 'Invalid discount amount';
        },
      },
    });
  };
}
