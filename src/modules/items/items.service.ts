import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { ICategoryItemSummary } from '../categories/entities';

import { IItem, INewItem, IQueryItem, IUpdateItem } from './entities';
import { ItemsRepository } from './items.repository';

@Injectable()
export class ItemsService {
  constructor(
    readonly itemsRepository: ItemsRepository,
    readonly categoriesService: CategoriesService,
  ) {}

  async createItem(newItem: INewItem): Promise<IItem> {
    const item = await this.itemsRepository.create(newItem).catch((error) => {
      throw new BadRequestException(error.message);
    });

    const itemSummary = this.getItemSummary(item);

    this.categoriesService.findAndAddItem(
      String(item.category.categoryId),
      itemSummary,
    );

    return item;
  }

  findAllItem(query: IQueryItem): Promise<IItem[]> {
    return this.itemsRepository.findListItem(query).catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
  }

  async findItemById(itemId: string): Promise<IItem> {
    const item = await this.itemsRepository
      .findItemById(itemId)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
    if (!item) {
      throw new BadRequestException('item is not exist!');
    }
    return item;
  }

  async findAndUpdateItemById(itemId: string, updateItem: IUpdateItem) {
    const item = await this.itemsRepository
      .findByIdAndUpdate(itemId, {
        $set: updateItem,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });

    if (!item) {
      throw new BadRequestException('item is not exist!');
    }

    return item;
  }

  getItemSummary(item): ICategoryItemSummary {
    return {
      itemId: item._id,
      barCode: item.barCode,
      itemName: item.name,
      avatarImage: item.avataImage,
      price: item.price,
      historicalSold: item.historicalSold,
      priceBeforeDiscount: item.priceBeforeDiscount,
      stock: item.stock,
      flashSale: item.flashSale,
    };
  }
}
