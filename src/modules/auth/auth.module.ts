import { User, UserRepository, UserSchema, TokenRepository, BlackListTokenSchema, BlackListToken } from '@/models';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthFactoryService } from './factory';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: BlackListToken.name, schema: BlackListTokenSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthFactoryService,
    ConfigService,
    UserRepository,
    TokenRepository,
  ],
})
export class AuthModule {}
