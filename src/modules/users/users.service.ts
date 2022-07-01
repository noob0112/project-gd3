import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { NewUserDto } from './dtos';
import { IUser } from './interfaces';
import { STATUS_ENUM } from './users.constant';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(readonly usersRepository: UsersRepository) {}

  async create(newUser: NewUserDto): Promise<IUser> {
    return await this.usersRepository
      .create(newUser)
      .then()
      .catch((error) => {
        if (error.keyPattern)
          switch (Object.keys(error.keyPattern)[0]) {
            case 'userName':
              throw new BadRequestException('userName is existed!');

            case 'email':
              throw new BadRequestException('email is existed!');

            case 'phoneNumber':
              throw new BadRequestException('phoneNumber is existed!');
          }
        throw new InternalServerErrorException('Internal_Server_Error');
      });
  }

  async findOneByUserName(userName: string): Promise<IUser> {
    return await this.usersRepository.findOne({
      userName: userName,
    });
  }

  async findByIdAndUpdateStatus(
    id: string,
    status: STATUS_ENUM,
  ): Promise<IUser> {
    return await this.usersRepository.findByIdAndUpdate(id, {
      $set: { status },
    });
  }
}
