import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Brand {
  readonly _id: Types.ObjectId;
  @Prop({ type: String, required: true, unique: true, trim: true })
  name: string;
  @Prop({ type: String, required: true, unique: true, trim: true })
  slug: string;
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Admin' })
  createdBy: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Admin' })
  updatedBy: Types.ObjectId;
  @Prop({ type: Object })
  logo: Object;
}
export const BrandSchema = SchemaFactory.createForClass(Brand);
