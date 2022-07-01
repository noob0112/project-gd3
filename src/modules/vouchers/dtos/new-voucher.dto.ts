import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class NewVoucherDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

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
  quatity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  discount: number;
}
