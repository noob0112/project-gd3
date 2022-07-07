import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { objectId } from 'src/common/types';
import * as mongoose from 'mongoose';
import {
  CategorySummary,
  FlashSaleSummary,
  FlashSaleSummarySchema,
} from 'src/common/schemas';

@Schema({ _id: false })
export class ItemSummary {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Item' })
  itemId: objectId;

  @Prop({ required: true })
  itemName: string;

  @Prop({ required: true })
  barCode: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  avatarImage: string;

  @Prop({ type: Object })
  flashSale?: FlashSaleSummary;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true })
  historicalSold: number;

  @Prop({ required: true })
  category: CategorySummary;
}

export const ItemSummarySchema = SchemaFactory.createForClass(ItemSummary);
