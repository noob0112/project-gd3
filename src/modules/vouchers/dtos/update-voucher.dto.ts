import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateVoucherDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty()
  @IsOptional()
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
  @IsOptional()
  @IsNumber()
  quatity: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discount: number;
}
