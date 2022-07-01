import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { NewCategoryDto } from './dtos/new-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(readonly categoriesService: CategoriesService) {}

  @Post()
  createCategory(@Body() newCategory: NewCategoryDto) {
    return this.categoriesService.createCategory(newCategory);
  }
}
