import { ApiProperty } from '@nestjs/swagger';
import { objectId } from 'src/common/types';

// SignUpEntity

export class SignUpEntity {
  @ApiProperty()
  _id: objectId;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;
}

// LoginEntity

class UserDetail {
  @ApiProperty()
  _id: objectId;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;
}

export class LoginEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: UserDetail;
}
