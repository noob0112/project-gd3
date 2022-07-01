import { Prop } from '@nestjs/mongoose';
import { objectId } from 'src/common/types';
import * as mongoose from 'mongoose';
import { CategorySummary } from 'src/common/schemas';

export class ItemSummary {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Item' })
  itemId: objectId;

  @Prop({ required: true })
  itemName: string;

  @Prop({ required: true })
  avataImage: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  priceBeforeDiscount: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  category: CategorySummary[];

  @Prop({ required: true })
  barCode: string;
}
