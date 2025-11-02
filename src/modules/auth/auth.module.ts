import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserMongoModule } from '@/shared';
import { AuthFactoryService } from './factory';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [UserMongoModule],
  controllers: [AuthController],
  providers: [AuthService,AuthFactoryService,JwtService,ConfigService],
})
export class AuthModule {}
