import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { BUCKETPATH_ENUM } from './upload.constants';

@Injectable()
export class UploadService {
  logger = new Logger(UploadService.name);

  configS3 = {
    AWS_S3_BUCKET_NAME: '19410723-hanoi-store',
    AWS_S3_END_POINT: process.env.AWS_END_POINT,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  };

  async upload(file: Express.Multer.File, bucketPath: BUCKETPATH_ENUM) {
    let urlKey = `${bucketPath}/${Date.now()}-${file.originalname}`;
    if (bucketPath === BUCKETPATH_ENUM['CATEGORY-IMAGE'])
      urlKey = `${bucketPath}/banner/${Date.now()}-${file.originalname}`;
    return await this.uploadS3(file.buffer, urlKey);
  }

  async uploadS3(file, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: this.configS3.AWS_S3_BUCKET_NAME,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          this.logger.error(err);
          reject(err.message);
        }
        resolve({
          key: data.Key,
          publicUrl: `https://${process.env.AWS_CNAME}/${data.Bucket}/${data.Key}`,
        });
      });
    });
  }

  getS3() {
    return new S3({
      endpoint: this.configS3.AWS_S3_END_POINT,
      accessKeyId: this.configS3.AWS_ACCESS_KEY_ID,
      secretAccessKey: this.configS3.AWS_SECRET_ACCESS_KEY,
    });
  }
}
