import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BUCKETPATH_ENUM } from '../upload.constants';

export class NewFileDetailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bucketPath: BUCKETPATH_ENUM;
}
