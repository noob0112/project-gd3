import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NewItemDto } from './dtos';

import { ItemsService } from './items.service';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post('/')
  createItem(@Body() newItem: NewItemDto) {
    return this.itemsService.createItem(newItem);
  }

  @Get('/')
  findListItem() {
    return this.itemsService.findListItem();
  }
}
