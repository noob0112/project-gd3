import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ItemSummaryDto } from 'src/modules/items/dtos';
export class NewItemFlashSaleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  flashSaleId: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => ItemSummaryDto)
  @IsNotEmpty()
  item: ItemSummaryDto;
}
