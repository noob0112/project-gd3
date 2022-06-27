import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';

describe('MailService', () => {
  let service: MailService;

  const mockMailerService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService, MailerService],
    })
      .overrideProvider(MailerService)
      .useValue(mockMailerService)
      .compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendUserConfirmation', () => {
    it('should send email for user', async () => {
      await service.sendUserConfirmation('test', 'token');

      expect(mockMailerService.sendMail).toHaveBeenCalled();
    });
  });
});
