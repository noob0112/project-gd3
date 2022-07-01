import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { objectId } from 'src/common/types';
import * as mongoose from 'mongoose';

export type ItemDocument = Item & Document;

class Category {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categoryId: objectId;
  @Prop({ required: true })
  nameCategory: string;
}

class FlashSale {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'FlashSale' })
  flashSaleId: objectId;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ required: true })
  priceBeforeDiscount: number;
}

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  barCode: string;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  weight: number;

  @Prop({ required: true })
  avataImage: string;

  @Prop()
  detailImage: [string];

  @Prop()
  description: string;

  @Prop({ default: null })
  flashSale?: FlashSale;

  @Prop({ required: true })
  stock: number;

  @Prop({ default: 0 })
  historicalSold: number;

  @Prop({ required: true })
  category: Category;

  @Prop({ default: 0 })
  countOfSelling: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
