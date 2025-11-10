import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { Brand } from '../entities/brand.entity';
import slugify from 'slugify';
import { UpdateBrandDto } from '../dto/update-brand.dto';
@Injectable()
export class BrandFactoryService {
  createBrand(createBrandDto: CreateBrandDto, user: any): Brand {
    const brand = new Brand();
    brand.name = createBrandDto.name as string;
    brand.slug = slugify(createBrandDto.name as string, {
      lower: true,
      trim: true,
    });
    brand.logo = createBrandDto.logo as Object;
    brand.createdBy = user._id;
    brand.updatedBy = user._id;
    return brand;
  }
  updateBrand(updateBrandDto: UpdateBrandDto, user: any): Brand {
    const brand = new Brand();
    brand.name = updateBrandDto.name as string;
    brand.slug = slugify(updateBrandDto.name as string, {
      lower: true,
      trim: true,
    });
    brand.logo = updateBrandDto.logo as Object;
    brand.updatedBy = user._id;
    return brand;
  }
}
