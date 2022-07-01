import { ROLE_ENUM, STATUS_ENUM } from '../users.constant';

export interface IUser {
  _id: string;

  userName: string;

  fullName: string;

  email: string;

  phoneNumber: string;

  password: string;

  address: string;

  role: ROLE_ENUM;

  status: STATUS_ENUM;
}
