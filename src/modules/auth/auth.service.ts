import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AES, enc } from 'crypto-js';
import { SignUpDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  //SIGNUP
  public async signUp(newUser: SignUpDto): Promise<boolean> {
    newUser.password = AES.encrypt(
      newUser.password,
      process.env.PASS_SECRET,
    ).toString();

    await this.userRepository
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

    this.mailService.sendUserConfirmation(
      {
        email: 'hoang011220@gmail.com',
        name: 'Hoang Nguyen',
      },
      'token',
    );

    return true;
  }

  //LOGIN
  public async login(userName: string, pass: string): Promise<any> {
    const userFind = await this.userRepository.findOne({
      userName: userName,
    });

    if (!userFind) {
      throw new HttpException(
        'email or password is not correct!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassord = AES.decrypt(
      userFind.password,
      process.env.PASS_SECRET,
    );

    const originalPassword = hashedPassord.toString(enc.Utf8);

    if (originalPassword !== pass) {
      throw new HttpException(
        'email or password is not correct!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = {
      userId: userFind._id,
      email: userFind.email,
      userName: userFind.userName,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        _id: userFind._id,
        fullName: userFind.fullName,
        email: userFind.email,
        address: userFind.address,
      },
    };
  }
}
