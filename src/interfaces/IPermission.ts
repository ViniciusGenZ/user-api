import { IBase, IListRequest, IListResponse } from './IBase';
import { IHttpMethodsEnum } from './IHttpMethodsEnum';
import { IModule } from './IModule';

export interface IPermission extends IBase {
	id_permission: number;
	url_regex: string;
	status_active: boolean;
	method: IHttpMethodsEnum;
	modules_sys_id_modules_sys: number;
	module?: IModule;
}
export type IPermissionFilters = Partial<IPermission>;

export type IPermissionCreateRequest = Omit<
	IPermission,
	'deleted_at' | 'updated_at' | 'id_permission' | 'permissions' | 'deleted_by'
>;

export type IPermissionCreateResponse = IPermission;

export interface IPermissionDeleteRequest {
	id_permission: number;
	by: number;
}

export type IPermissionDeleteResponse = IPermission;

export type IPermissionReadRequest = Pick<IPermission, 'id_permission'>;

export type IPermissionReadResponse = IPermission;

export type IPermissionUpdateRequest = Pick<IPermission, 'updated_by'> &
	Partial<IPermission>;

export type IPermissionUpdateResponse = IPermission;

export type IPermissionListRequest = IListRequest<IPermissionFilters>;

export type IPermissionListResponse = IListResponse<IPermission>;
