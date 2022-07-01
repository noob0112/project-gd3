import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TimestampsMongodb } from 'src/common/schemas';

import { ItemSummary } from 'src/modules/items/schemas';
import { STATUS_CATEGORY_ENUM } from '../categories.constant';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category extends TimestampsMongodb {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({
    enum: STATUS_CATEGORY_ENUM,
    default: STATUS_CATEGORY_ENUM.ACTION,
  })
  status: STATUS_CATEGORY_ENUM;

  @Prop({ default: null })
  listItems: ItemSummary[];

  @Prop({ required: true })
  banner: string;

  @Prop({ default: new Date().getTime() })
  field: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
