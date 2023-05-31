import { IBase, IListRequest, IListResponse } from "./IBase";
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
  email_verification_code: string;
  email_verification_code_expiration: Date;
  phone_number_verification_code: string;
  phone_number_verification_code_expiration: Date;
}
export type UserFilters = Partial<Omit<IUser, keyof IBase>>;

export type IUserCreateRequest = Omit<
  IUser,
  | "deleted_by"
  | "deleted_at"
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
  id_user: number;
  by: number;
}

export type IUserDeleteResponse = IUser;

export type IUserReadRequest = Pick<IUser, "id_user">;

export type IUserReadResponse = IUser;

export type IUserUpdateRequest = Pick<IUser, "updated_by"> & Partial<Omit<IUser, "created_by" | "created_at">>;

export type IUserUpdateResponse = IUser;

export type IUserListRequest = IListRequest<UserFilters>;

export type IUserListResponse = IListResponse<IUser>;
