import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { userFactoryService } from './factory';
import { UserMongoModule } from '@/shared';

@Module({
  imports: [UserMongoModule],
  controllers: [CustomerController],
  providers: [CustomerService, userFactoryService],
})
export class CustomerModule {}
