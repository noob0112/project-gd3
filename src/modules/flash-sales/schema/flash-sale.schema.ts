import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ItemSummary } from 'src/modules/items/schemas';

export type FlashSaleDocument = FlashSale & Document;

@Schema({ timestamps: true })
export class FlashSale {
  @Prop({ required: true })
  name: string;

  @Prop()
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop({ default: false })
  isOnGoing: boolean;

  @Prop({ type: Array, default: [] })
  listItems: ItemSummary[];
}

export const FlashSaleSchema = SchemaFactory.createForClass(FlashSale);
