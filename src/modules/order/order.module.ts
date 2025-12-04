import { Order, OrderRepository, OrderSchema } from '@/models';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from '../cart/cart.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    CartModule,
    ProductModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
