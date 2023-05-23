import { IBase, IListRequest, IListResponse } from "./IBase";
import { IPermission } from "./IPermission";

export interface IRole extends IBase {
    id_role: number
    name_py: string
    name_en: string
    name_br: string
    permissions?: IPermission[]
}
export type IRoleFilters = Partial<Omit<IRole, 'sessions'>>;

export type IRoleCreateRequest = Omit<
    IRole,
    | "status_active"
    | "deleted_at"
    | "created_by"
    | "updated_by"
    | "deleted_by"
    | "id_role"
    | "permissions"
>;

export type IRoleCreateResponse = IRole;

export interface IRoleDeleteRequest {
    id_role: number;
    deleted_by: number;
}

export type IRoleDeleteResponse = IRole;

export type IRoleReadRequest = Pick<IRole, "id_role">;

export type IRoleReadResponse = IRole;

export type IRoleUpdateRequest = Pick<IRole, "id_role"> & Partial<Omit<IRole, "deleted_at"
    | "created_by"
    | "deleted_by"
    | "id_role"
    | "permissions">>;

export type IRoleUpdateResponse = IRole;

export type IRoleListRequest = IListRequest<IRoleFilters>;

export type IRoleListResponse = IListResponse<IRole>;
