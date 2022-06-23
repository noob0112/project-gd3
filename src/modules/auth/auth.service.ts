import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { AES, enc } from 'crypto-js';
import { SignUpDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  //SIGNUP
  public async signUp(newUser: SignUpDto): Promise<any> {
    newUser.password = AES.encrypt(
      newUser.password,
      process.env.PASS_SECRETS,
    ).toString();

    // try {
    return await this.authRepository
      .create(newUser)
      .then((user) => {
        return {
          _id: user._id,
          userName: user.userName,
          fullName: user.fullName,
          email: user.email,
          address: user.address,
        };
      })
      .catch((error) => {
        console.log(error);
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

  //LOGIN
  public async login(email: string, pass: string): Promise<any> {
    try {
      const userFind = await this.validateUser(email, pass);
      if (!userFind) {
        throw new HttpException(
          'email or password is not correct!',
          HttpStatus.BAD_REQUEST,
        );
      }
      const payload = {
        userId: userFind._id,
        email: userFind.email,
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
    } catch (error) {
      console.log(error);
      throw new HttpException(error.response, error.status);
    }
  }

  public async validateUser(email: string, pass: string): Promise<any> {
    try {
      const userFind = await this.authRepository.findOne({
        email: email,
      });

      if (!userFind) {
        return false;
      }
      const hashedPassord = AES.decrypt(
        userFind.password,
        process.env.PASS_SECRET,
      );

      const originalPassword = hashedPassord.toString(enc.Utf8);

      if (originalPassword !== pass) {
        return false;
      }

      return userFind;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }
}
