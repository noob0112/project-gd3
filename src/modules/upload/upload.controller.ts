import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  // FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(readonly uploadService: UploadService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFiles() file: Express.Multer.File) {
    return await this.uploadService.upload(file);
  }

  // @Post('/')
  // @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 2 }]))
  // async upload(
  //   @UploadedFiles() file: Array<Express.Multer.File>,
  //   @Body() body,
  // ) {
  //   return await this.uploadService.upload(file['file'][0]);
  // }
}
