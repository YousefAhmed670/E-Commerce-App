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

BrandSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'brandId',
});

BrandSchema.pre(
  'deleteOne',
  { document: false, query: true },
  async function (next) {
    try {
      const filter = this.getFilter();
      const brandId = filter._id;
      if (brandId) {
        const ProductModel = this.model.db.model('Product');
        await ProductModel.deleteMany({ brandId });
      }
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
);
