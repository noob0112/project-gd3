import { Injectable } from '@nestjs/common';
import { ItemSummaryDto } from '../items/dtos';
import { NewFlashSaleDto } from './dtos/new-flash-sale.dto';
import { FlashSalesRepository } from './flash-sales.repository';
import { IFlashSale } from './interfaces';

@Injectable()
export class FlashSalesService {
  constructor(readonly flashSalesRepository: FlashSalesRepository) {}

  async creatFlashSale(newFlashSale: NewFlashSaleDto): Promise<IFlashSale> {
    return await this.flashSalesRepository.create(newFlashSale);
  }

  async findAllFlashSales(): Promise<IFlashSale[]> {
    return await this.flashSalesRepository.find();
  }

  async findFlashSaleById(flashSaleId: string): Promise<IFlashSale> {
    return this.flashSalesRepository.findById(flashSaleId);
  }

  async updateFlashSaleById(flasSaleId: string, updateFlashSale) {
    return await this.flashSalesRepository.findByIdAndUpdate(flasSaleId, {
      $set: updateFlashSale,
    });
  }

  async addItemToFlashSale(
    flashSaleId: string,
    newItemFlashSaleDto: ItemSummaryDto,
  ) {
    this.updateFlashSaleById(flashSaleId, { listItems: newItemFlashSaleDto });
  }
}
