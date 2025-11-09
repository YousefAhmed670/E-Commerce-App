import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  discriminatorKey: 'role',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
  readonly _id: Types.ObjectId;
  @Prop({ type: String, required: true })
  userName: string;
  @Prop({ type: String, required: true, unique: true })
  email: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: String })
  phoneNumber: string;
  @Prop({ type: String })
  otp: string;
  @Prop({ type: Date })
  otpExpiry: Date;
  @Prop({ type: Boolean, default: false })
  isVerified: boolean;
  @Prop({ type: Date })
  credentialUpdatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
