import { Injectable } from '@nestjs/common';
import { CategorysRepository } from './categories.repository';
import { INewCategory } from './entities';
import { ICategory } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(readonly categoriesRepository: CategorysRepository) {}

  createCategory(newCategory: INewCategory): Promise<ICategory> {
    return this.categoriesRepository.create(newCategory);
  }
}
