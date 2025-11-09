import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../abstract.repository';
import { BlackListToken } from './token.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TokenRepository extends AbstractRepository<BlackListToken> {
  constructor(
    @InjectModel(BlackListToken.name)
    private readonly tokenModel: Model<BlackListToken>,
  ) {
    super(tokenModel);
  }
}
