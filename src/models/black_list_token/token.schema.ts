import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
export enum TokenType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}
export enum UserRole {
  ADMIN = 'Admin',
  CUSTOMER = 'Customer',
  SELLER = 'Seller',
}
@Schema({ timestamps: true })
export class BlackListToken {
  readonly _id: Types.ObjectId;
  @Prop({ type: String, required: true })
  token: string;
  @Prop({ type: String, required: true })
  userId: string;
  @Prop({
    type: String,
    enum: TokenType,
    required: true,
    default: TokenType.ACCESS_TOKEN,
  })
  type: TokenType;
  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.CUSTOMER,
    required: true,
  })
  role: UserRole;
}
export const BlackListTokenSchema =
  SchemaFactory.createForClass(BlackListToken);
