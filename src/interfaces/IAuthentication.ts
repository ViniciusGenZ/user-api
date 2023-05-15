import { IUser } from './IUser';

export interface IAuthenticationRequest {
  email: string;
  password: string;
}

export type IAuthenticationResponse = IUser
