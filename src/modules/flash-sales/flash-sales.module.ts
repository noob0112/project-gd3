import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashSalesController } from './flash-sales.controller';
import { FlashSalesRepository } from './flash-sales.repository';
import { FlashSalesService } from './flash-sales.service';
import { FlashSaleSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'FlashSale',
        schema: FlashSaleSchema,
      },
    ]),
  ],
  controllers: [FlashSalesController],
  providers: [FlashSalesService, FlashSalesRepository],
})
export class FlashSalesModule {}
