import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export enum UserAgent {
  GOOGLE = 'google',
  LOCAL = 'local',
}
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
  @Prop({
    type: String,
    required: function () {
      return this.userAgent == UserAgent.LOCAL;
    },
  })
  password?: string;
  @Prop({ type: String })
  phoneNumber?: string;
  @Prop({ type: String, enum: Gender, default: Gender.MALE })
  gender: Gender;
  @Prop({ type: String, enum: UserAgent, default: UserAgent.LOCAL })
  userAgent: UserAgent;
  @Prop({ type: String })
  otp: string;
  @Prop({ type: Date })
  otpExpiry: Date;
  @Prop({ type: Boolean, default: false })
  isVerified: boolean;
  @Prop({ type: Date })
  credentialUpdatedAt: Date;
  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
  @Prop({ type: Date })
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
