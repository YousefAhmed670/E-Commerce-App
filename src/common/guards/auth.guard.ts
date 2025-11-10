import { TokenRepository, TokenType, UserRepository } from '@/models';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC } from '../decorators';
import { MESSAGE } from '../constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.get<boolean>(
        IS_PUBLIC,
        context.getHandler(),
      );
      if (isPublic) return true;
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization;
      if (!token) {
        throw new UnauthorizedException();
      }
      const payload = this.jwtService.verify<{
        _id: string;
        email: string;
        role: string;
        iat: number;
      }>(token, {
        secret: this.configService.get<string>('token.secret'),
      });
      const userExist = await this.userRepository.getOne({
        _id: payload._id,
      });
      if (!userExist) {
        throw new NotFoundException(MESSAGE.user.notFound);
      }
      const blackListTokenExist = await this.tokenRepository.getOne({
        token,
        userId: userExist._id,
        type: TokenType.ACCESS_TOKEN,
      });
      if (blackListTokenExist) {
        throw new UnauthorizedException('User logged out');
      }
      if (userExist.credentialUpdatedAt > new Date(payload.iat! * 1000)) {
        throw new UnauthorizedException('invalid credentials');
      }
      request.user = userExist;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
