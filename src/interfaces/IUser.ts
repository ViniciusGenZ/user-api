import { IBase, IBaseCreateToOmit, IListRequest, IListResponse } from "./IBase";
import { IUserSession } from "./IUserSession";

export interface IUser extends IBase {
  id_user: number;
  email: string;
  name: string;
  surname: string;
  document: string;
  phone_number: string;
  whats: string;
  birthdate: Date;
  password: string;
  allow_multiple_sessions: boolean;
  email_verified: boolean;
  phone_number_verified: boolean;
  user_sessions: IUserSession[];
  login_attempts: number;
  ban_expiration: Date;
  banned: boolean;
}
export type UserFilters = Partial<Omit<IUser, keyof IBase>>;

export type IUserCreateRequest = Omit<
  IUser,
  | keyof IBaseCreateToOmit
  | "id_user"
  | "allow_multiple_sessions"
  | "email_verified"
  | "phone_number_verified"
  | "user_sessions"
  | "login_attempts"
  | "ban_expiration"
  | "banned"
>;

export type IUserCreateResponse = IUser;

export interface IUserDeleteRequest {
  id_User: number;
}

export type IUserDeleteResponse = IUser;

export type IUserReadRequest = Pick<IUser, "id_user">;

export type IUserReadResponse = IUser;

export type IUserUpdateRequest = Partial<Omit<IUser, keyof IBase>>;

export type IUserUpdateResponse = IUser;

export type IUserListRequest = IListRequest<UserFilters>;

export type IUserListResponse = IListResponse<IUser>;
