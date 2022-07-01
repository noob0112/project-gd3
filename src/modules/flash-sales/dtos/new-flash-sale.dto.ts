import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmpty,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class NewFlashSaleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endTime: Date;

  @ApiProperty()
  @IsEmpty()
  isOnGoing: boolean;

  @ApiProperty()
  @IsEmpty()
  listItems: object[];
}
