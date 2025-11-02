import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  discriminatorKey: 'role',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Admin {
  readonly _id: Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
