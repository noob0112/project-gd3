import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { mockSignUp, mockSignUpResponse } from './auth.mock';
import { AES } from 'crypto-js';
import { UsersRepository } from '../users/users.repository';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken('User'),
          useValue: {},
        },
        AuthService,
        UsersRepository,
        JwtService,
      ],
    })
      .overrideProvider(UsersRepository)
      .useValue(mockUsersRepository)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return new user', async () => {
      AES.encrypt = jest.fn().mockResolvedValue('secret');

      mockUsersRepository.create.mockResolvedValue(mockSignUpResponse);

      const result = await service.signUp(mockSignUp);

      expect(result).toEqual(true);
    });
  });
});
