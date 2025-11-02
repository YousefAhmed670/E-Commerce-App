import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Admin,
    AdminRepository,
    AdminSchema,
    Customer,
    CustomerRepository,
    CustomerSchema,
    Seller,
    SellerRepository,
    SellerSchema,
    User,
    UserSchema,
} from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        discriminators: [
          { name: Admin.name, schema: AdminSchema },
          { name: Seller.name, schema: SellerSchema },
          { name: Customer.name, schema: CustomerSchema },
        ],
      },
    ]),
  ],
  providers: [CustomerRepository, AdminRepository, SellerRepository],
  exports: [CustomerRepository, AdminRepository, SellerRepository],
})
export class UserMongoModule {}
