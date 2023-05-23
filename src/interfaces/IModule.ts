import { IListRequest, IListResponse } from "./IBase";
import { IPermission } from "./IPermission";

export interface IModule {
    id_module: number
    permissions?: IPermission[]
    name_py: string
    name_en: string
    name_br: string
    status_active: boolean
}
export type IModuleFilters = Partial<Omit<IModule, 'permissions'>>;

export type IModuleCreateRequest = Omit<
    IModule,
    | "id_module"
    | "permissions"
>;

export type IModuleCreateResponse = Omit<IModule, 'permissions'>;

export interface IModuleDeleteRequest {
    id_module: number;
    by: number;
}

export type IModuleDeleteResponse = IModule;

export type IModuleReadRequest = Pick<IModule, "id_module">;

export type IModuleReadResponse = IModule;

export type IModuleUpdateRequest = Partial<Omit<IModule, 'permissions'>>

export type IModuleUpdateResponse = IModule;

export type IModuleListRequest = IListRequest<IModuleFilters>;

export type IModuleListResponse = IListResponse<IModule>;
