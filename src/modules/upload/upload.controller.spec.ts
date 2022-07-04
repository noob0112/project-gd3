import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { mockUploadS3 } from './upload.mock';
describe('UploadController', () => {
  let controller: UploadController;

  const mockUploadService = {
    upload: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [UploadService],
    })
      .overrideProvider(UploadService)
      .useValue(mockUploadService)
      .compile();

    controller = module.get<UploadController>(UploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('upload', () => {
    it('[Expect-Success] return key and publicUrl', async () => {
      mockUploadService.upload.mockResolvedValue(mockUploadS3);

      let file: Express.Multer.File;

      const result = await controller.upload(file);

      expect(result).toBe(mockUploadS3);
    });
  });
});
