import { objectId } from '../types';
import { ICategorySummary } from './category-summary.entity';
import { IFlashSaleSummary } from './flash-sale-summary.entity';

export interface IItemSummary {
  itemId: objectId | string;
  itemName: string;
  barCode: string;
  price: number;
  avatarImage: string;
  flashSale?: IFlashSaleSummary;
  stock: number;
  historicalSold: number;
  category: ICategorySummary;
}
