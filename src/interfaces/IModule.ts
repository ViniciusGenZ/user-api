import { IListRequest, IListResponse } from "./IBase";
import { IPermission } from "./IPermission";

export interface IModule {
    id_modules_sys: number
    permissions?: IPermission[]
    name_py: string
    name_en: string
    name_br: string
    maintenance: boolean
}
export type IModuleFilters = Partial<Omit<IModule, 'permissions'>>;

export type IModuleCreateRequest = Omit<
    IModule,
    | "id_modules_sys"
    | "permissions"
>;

export type IModuleCreateResponse = Omit<IModule, 'permissions'>;

export interface IModuleDeleteRequest {
    id_modules_sys: number;
    by: number;
}

export type IModuleDeleteResponse = IModule;

export type IModuleReadRequest = Pick<IModule, "id_modules_sys">;

export type IModuleReadResponse = IModule;

export type IModuleUpdateRequest = Partial<Omit<IModule, 'permissions'>>

export type IModuleUpdateResponse = IModule;

export type IModuleListRequest = IListRequest<IModuleFilters>;

export type IModuleListResponse = IListResponse<IModule>;
