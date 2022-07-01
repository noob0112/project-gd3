import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { objectId } from 'src/common/types';

export class CategorySummary {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categoryId: objectId;

  @Prop({ required: true, unique: true })
  nameCategory: string;
}
