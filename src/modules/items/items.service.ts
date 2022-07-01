import { Injectable } from '@nestjs/common';
import { NewItemDto } from './dtos';
import { ItemsRepository } from './items.repository';

@Injectable()
export class ItemsService {
  constructor(readonly itemsRepository: ItemsRepository) {}

  createItem(item: NewItemDto) {
    return this.itemsRepository.create(item);
  }

  public async findListItem() {
    return await this.itemsRepository.find({}, { cost: 0, countOfSelling: 0 });
  }

  public async findItemById(itemId: string) {
    return this.itemsRepository.findById(itemId, {
      cost: 0,
      countOfSelling: 0,
    });
  }

  public async updateItemById(itemId: string, updateItem) {
    return this.itemsRepository.findByIdAndUpdate(itemId, { $set: updateItem });
  }
}
