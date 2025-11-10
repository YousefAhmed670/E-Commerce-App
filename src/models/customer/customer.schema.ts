import { eventEmitter, hash } from '@/common/utilities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  discriminatorKey: 'role',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Customer {
  readonly _id: Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  otp: string;
  otpExpiry: Date;
  isVerified: boolean;
  isDeleted: boolean;
  deletedAt: Date;
  @Prop({ type: String, enum: ['local', 'google'], default: 'local' })
  userAgent: string;
  credentialUpdatedAt: Date;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.pre('save', async function (next) {
  if (this.userAgent !== 'google' && this.isNew) {
    eventEmitter.emit('userRegistered', {
      email: this.email,
      otp: this.otp,
    });
  }
  this.otp = await hash(this.otp as string);
  next();
});