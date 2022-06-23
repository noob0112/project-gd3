import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from '../../database/entity.repository';
import { UserDocument } from '../users/models/users.schema';

@Injectable()
export class AuthRepository extends Repository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }
}
