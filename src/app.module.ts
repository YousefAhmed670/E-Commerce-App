import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import devConfig from './config/env/dev.config';
import { AuthModule } from './modules/auth/auth.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';
import { CommonModule } from './shared';
import { CouponModule } from './modules/coupon/coupon.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [devConfig], isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('database').url,
      }),
    }),
    CacheModule.register({
      ttl: 5 * 60 * 1000,
      isGlobal: true,
    }),
    CommonModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    BrandModule,
    CustomerModule,
    CouponModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
