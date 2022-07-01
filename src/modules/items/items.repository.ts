import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../database/entity.repository';
import { ItemDocument } from './schemas';

@Injectable()
export class ItemsRepository extends EntityRepository<ItemDocument> {
  constructor(
    @InjectModel('Item')
    private readonly itemModel: Model<ItemDocument>,
  ) {
    super(itemModel);
  }
}
