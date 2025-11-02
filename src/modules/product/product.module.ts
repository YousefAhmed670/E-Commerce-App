import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UserMongoModule } from '@/shared';

@Module({
  imports: [UserMongoModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
