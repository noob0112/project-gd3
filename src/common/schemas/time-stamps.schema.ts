import { Prop } from '@nestjs/mongoose';
import { objectId } from '../types';

export class TimestampsMongodb {
  _id: objectId | string;

  createdAt?: Date;

  updatedAt?: Date;
}
