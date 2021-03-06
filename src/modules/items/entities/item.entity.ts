import { ICategorySummary } from 'src/common/entities';
import { FlashSaleSummary } from 'src/common/schemas';

export interface IItem {
  _id: string;
  name: string;
  barCode: string;
  cost: number;
  price: number;
  priceBeforeDiscount?: number;
  weight: number;
  avataImage: string;
  detailImage: string[];
  description: string;
  flashSale?: FlashSaleSummary;
  stock: number;
  historicalSold: number;
  category: ICategorySummary;
  countOfSelling: number;
}
