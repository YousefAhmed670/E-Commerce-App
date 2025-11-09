import { Category, CategoryRepository, CategorySchema } from '@/models';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryFactoryService } from './facyory';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryFactoryService, CategoryRepository],
  exports: [CategoryService, CategoryFactoryService, CategoryRepository],
})
export class CategoryModule {}
