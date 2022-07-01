import { IItemSummary } from 'src/common/entities';
import { objectId } from 'src/common/types';
import { STATUS_CATEGORY_ENUM } from '../categories.constant';

export interface ICategory {
  _id: objectId | string;
  name: string;
  status: STATUS_CATEGORY_ENUM;
  listItems: IItemSummary[];
  banner: string;
  field: number;
}
