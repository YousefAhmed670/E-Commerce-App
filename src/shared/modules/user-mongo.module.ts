import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Admin,
  AdminRepository,
  AdminSchema,
  BlackListToken,
  BlackListTokenSchema,
  Customer,
  CustomerRepository,
  CustomerSchema,
  Seller,
  SellerRepository,
  SellerSchema,
  TokenRepository,
  User,
  UserRepository,
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
      {
        name: BlackListToken.name,
        schema: BlackListTokenSchema,
      },
    ]),
  ],
  providers: [
    CustomerRepository,
    AdminRepository,
    SellerRepository,
    UserRepository,
    TokenRepository,
  ],
  exports: [
    CustomerRepository,
    AdminRepository,
    SellerRepository,
    UserRepository,
    TokenRepository,
  ],
})
export class UserMongoModule {}
