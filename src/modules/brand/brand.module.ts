import { Brand, BrandRepository, BrandSchema } from '@/models';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BrandFactoryService } from './factory';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
  ],
  controllers: [BrandController],
  providers: [BrandService, BrandFactoryService, BrandRepository],
  exports: [BrandService, BrandFactoryService, BrandRepository],
})
export class BrandModule {}
