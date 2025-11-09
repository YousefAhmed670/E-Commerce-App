import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { Brand } from '../entities/brand.entity';
import slugify from 'slugify';
import { UpdateBrandDto } from '../dto/update-brand.dto';
@Injectable()
export class BrandFactoryService {
  createBrand(createBrandDto: CreateBrandDto, user: any): Brand {
    const brand = new Brand();
    brand.name = createBrandDto.name;
    brand.slug = slugify(createBrandDto.name, {
      lower: true,
      trim: true,
    });
    brand.logo = createBrandDto.logo;
    brand.createdBy = user._id;
    brand.updatedBy = user._id;
    return brand;
  }
  updateBrand(updateBrandDto: UpdateBrandDto, user: any): Brand {
    const brand = new Brand();
    brand.name = updateBrandDto.name || brand.name;
    brand.logo = updateBrandDto.logo || brand.logo;
    brand.updatedBy = user._id;
    return brand;
  }
}
