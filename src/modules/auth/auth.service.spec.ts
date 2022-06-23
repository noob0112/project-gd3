import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { mockSignUp, mockSignUpResponse } from './auth.mock';
import { AES } from 'crypto-js';

describe('AuthService', () => {
  let service: AuthService;

  const mockAuthRepository = {
    create: jest.fn(),
  };

  const mockAES = {
    encrypt: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken('User'),
          useValue: {},
        },
        AuthService,
        AuthRepository,
        JwtService,
      ],
    })
      .overrideProvider(AuthRepository)
      .useValue(mockAuthRepository)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return new user', async () => {
      mockAuthRepository.create.mockResolvedValue(mockSignUpResponse);

      mockAES.encrypt.mockResolvedValue('secret');

      const result = await service.signUp(mockSignUp);
      expect(result).toEqual(mockSignUpResponse);
    });
  });
});
