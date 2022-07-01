import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectIdDto } from 'src/common/dtos';
import { ItemSummaryDto } from '../items/dtos';
import { NewFlashSaleDto, NewItemFlashSaleDto } from './dtos';
import { FlashSalesService } from './flash-sales.service';
import { IFlashSale } from './interfaces';

@Controller('flash-sales')
@ApiTags('flash-sales')
export class FlashSalesController {
  constructor(readonly flashSalesService: FlashSalesService) {}

  @Post('/')
  createFlashSale(@Body() newFlashSale: NewFlashSaleDto): Promise<IFlashSale> {
    return this.flashSalesService.creatFlashSale(newFlashSale);
  }

  @Get('/')
  findAllFlashSales(): Promise<IFlashSale[]> {
    return this.flashSalesService.findAllFlashSales();
  }

  @Get('/:_id')
  findFlashSaleById(@Param() param: ObjectIdDto): Promise<IFlashSale> {
    return this.flashSalesService.findFlashSaleById(param._id);
  }

  @Put('/:_id')
  updateFlashSaleById(@Param() param: ObjectIdDto, @Body() updateFlashSale) {
    return this.flashSalesService.updateFlashSaleById(
      param._id,
      updateFlashSale,
    );
  }

  @Post('/:_id/items')
  addItemToFlashSale(
    @Param() param: ObjectIdDto,
    @Body() newItemFlashSaleDto: ItemSummaryDto,
  ) {
    console.log(newItemFlashSaleDto);
    return;
  }
}
