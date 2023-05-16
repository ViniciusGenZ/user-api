import {
  IBase,
  IBaseCreateToOmit,
  IListRequest,
  IListResponse,
  IUpdateManyRequest,
  IUpdateManyResponse,
} from "./IBase";
import { ISessionType } from "./ISessionType";
import { IUser } from "./IUser";

export interface IUserSession extends IBase {
  id_user_session: number;
  ip: string;
  authorized: boolean;
  user_agent: string;
  session_types_id_session_type: number;
  users_id_user: number;
  expiration_date: Date;
  user?: IUser;
  session_type?: ISessionType;
  code: string;
  code_expiration: Date;
  code_verified: boolean;
}

export type IUserSessionFilters = Partial<
  Omit<IUserSession, "id_user_session">
>;

export type IUserSessionCreateRequest = Omit<
  IUserSession,
  | keyof IBaseCreateToOmit
  | "id_user_session"
  | "authorized"
  | "code"
  | "user"
  | "session_type"
  | "code"
  | "code_expiration"
  | "code_verified"
>;

export type IUserSessionCreateResponse = IUserSession;

export interface IUserSessionDeleteRequest {
  id_session: number;
}

export type IUserSessionDeleteResponse = IUserSession;

export type IUserSessionReadRequest = Pick<IUserSession, "id_user_session">

export type IUserSessionReadResponse = IUserSession;

export type IUserSessionUpdateRequest = Partial<
  Omit<IUserSession, keyof IBase>
>;

export type IUserSessionUpdateResponse = IUserSession;

export type IUserSessionUpdateManyRequest = IUpdateManyRequest<
  Partial<Omit<IUserSession, keyof Omit<IBase, "status_active">>>,
  Partial<Omit<IUserSession, keyof Omit<IBase, "status_active">>>
>;

export type IUserSessionUpdateManyResponse = IUpdateManyResponse<IUserSession>;

export type IUserSessionListRequest = IListRequest<IUserSessionFilters>;

export type IUserSessionListResponse = IListResponse<IUserSession>;
