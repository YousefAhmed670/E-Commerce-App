import { UserAgent } from '@/models';
import { Types } from 'mongoose';

export class Customer {
  readonly _id: Types.ObjectId;
  userName: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  gender?: string;
  otp: string;
  otpExpiry: Date;
  isVerified: boolean;
  isDeleted: boolean;
  deletedAt: Date;
  userAgent: UserAgent;
  credentialUpdatedAt: Date;
}
