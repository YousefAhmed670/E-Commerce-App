import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  discriminatorKey: 'role',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Seller {
  readonly _id: Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  @Prop({ type: String, required: true })
  whatsappNumber: string;
  @Prop({ type: String, required: true })
  shopName: string;
  @Prop({ type: String, required: true })
  shopDescription: string;
  @Prop({ type: String, required: true })
  shopAddress: string;
  isDeleted: boolean;
  deletedAt: Date;
  gender: string;
  credentialUpdatedAt: Date;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);
