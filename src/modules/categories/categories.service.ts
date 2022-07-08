import { Injectable, NotFoundException } from '@nestjs/common';
import { CategorysRepository } from './categories.repository';
import {
  ICategoryItemSummary,
  INewCategory,
  IUpdateCategory,
} from './entities';
import { ICategory } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(readonly categoriesRepository: CategorysRepository) {}

  createCategory(newCategory: INewCategory): Promise<ICategory> {
    return this.categoriesRepository.create(newCategory);
  }

  findAllCategories(): Promise<ICategory[]> {
    return this.categoriesRepository.find();
  }

  findCategoryById(id: string): Promise<ICategory> {
    const category = this.categoriesRepository.findById(id);

    if (!category) {
      throw new NotFoundException('Category Id is incorrect or not exist!');
    }

    return category;
  }

  async findAndUpdateCategoryById(
    id: string,
    updateCategory: IUpdateCategory,
  ): Promise<ICategory> {
    const category = await this.categoriesRepository.findByIdAndUpdate(
      id,
      updateCategory,
      {
        new: true,
        fields: { listItems: 0 },
      },
    );

    if (!category) {
      throw new NotFoundException('Category Id is incorrect or not exist!');
    }
    return category;
  }

  findAndAddItem(
    id: string,
    itemSummary: ICategoryItemSummary,
  ): Promise<ICategory> {
    return this.categoriesRepository.findByIdAndAddItem(id, itemSummary);
  }

  async findAndDeleteCategoryById(id: string): Promise<void> {
    const category = await this.categoriesRepository.findByIdAndDelete(id);
    if (!category) {
      throw new NotFoundException('Category Id is incorrect or not exist!');
    }
    return;
  }
}
