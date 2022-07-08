import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  FlashSaleSummary,
  FlashSaleSummarySchema,
  ItemSummary,
} from 'src/common/schemas';

@Schema({ _id: false })
export class CategoryItemSummary extends ItemSummary {
  @Prop({ type: FlashSaleSummarySchema })
  flashSale?: FlashSaleSummary;
}

export const CategoryItemSummarySchema =
  SchemaFactory.createForClass(CategoryItemSummary);
