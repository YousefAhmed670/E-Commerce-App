import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { DiscountType } from '../types';

export function IsValidEndDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidEndDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any;
          const { startDate } = obj;
          if (startDate < value) {
            return true;
          }
          return false;
        },
        defaultMessage(args: ValidationArguments) {
          const obj = args.object as any;
          const { startDate } = obj;
          if (startDate < args.value) {
            return 'End date must be greater than start date';
          }
          return 'Invalid end date';
        },
      },
    });
  };
}
