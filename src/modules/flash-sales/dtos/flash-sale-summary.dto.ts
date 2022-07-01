import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class FlashSaleSummaryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  flashSaleId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  priceBeforeDiscount: number;
}
