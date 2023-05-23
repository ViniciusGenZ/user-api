import { IBase, IListRequest, IListResponse } from "./IBase";
import { IUserSession } from "./IUserSession";

export interface ISessionType {
    id_session_type: number
    name_py: string
    name_en: string
    name_br: string
    status_active: boolean
    sessions?: IUserSession[]
}
export type ISessionTypeFilters = Partial<Omit<ISessionType, keyof IBase | 'sessions'>>;

export type ISessionTypeCreateRequest = Omit<
  ISessionType,
  | keyof IBase
  | "id_session_type"
  | "status_active"
  | "sessions"
>;

export type ISessionTypeCreateResponse = ISessionType;

export interface ISessionTypeDeleteRequest {
  id_User: number;
}

export type ISessionTypeDeleteResponse = ISessionType;

export type ISessionTypeReadRequest = Pick<ISessionType, "id_session_type">;

export type ISessionTypeReadResponse = ISessionType;

export type ISessionTypeUpdateRequest = Partial<Omit<ISessionType, keyof IBase | 'sessions'>>;

export type ISessionTypeUpdateResponse = ISessionType;

export type ISessionTypeListRequest = IListRequest<ISessionTypeFilters>;

export type ISessionTypeListResponse = IListResponse<ISessionType>;
