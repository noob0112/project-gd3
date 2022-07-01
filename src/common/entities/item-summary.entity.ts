import { objectId } from '../types';
import { ICategorySummary } from './category-summary.entity';
import { IFlashSaleSummary } from './flash-sale-summary.entity';

export interface IItemSummary {
  itemId: objectId | string;
  barCode: string;
  itemName: string;
  avatarImage: string;
  price: number;
  priceBeforeDiscount: number;
  quantity: number;
  category: ICategorySummary;
  // flashSale: IFlashSaleSummary;
}
