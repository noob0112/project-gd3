import { ICategorySummary } from './category-summary.entity';
import { IFlashSaleSummary } from './flash-sale-summary.entity';

export interface IItemSummary {
  itemId: string;
  barcode: string;
  itemName: string;
  avatarImage: string;
  price: number;
  priceBeforeDiscount: number;
  quatity: number;
  category: ICategorySummary;
  flashSale: IFlashSaleSummary;
}
