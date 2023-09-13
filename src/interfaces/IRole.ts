import { IBase, IListRequest, IListResponse } from './IBase';
import { IPermission } from './IPermission';

export interface IRole extends IBase {
	id_role: number;
	name_py: string;
	name_en: string;
	name_br: string;
	permissions?: IPermission[];
}
export type IRoleFilters = Partial<Omit<IRole, keyof IBase | 'sessions'>>;

export type IRoleCreateRequest = Omit<
	IRole,
	| 'id_role'
	| 'permissions'
	| 'deleted_by'
	| 'deleted_at'
	| 'created_at'
	| 'updated_at'
>;

export type IRoleCreateResponse = IRole;

export interface IRoleDeleteRequest {
	id_role: number;
	by: number;
}

export type IRoleDeleteResponse = IRole;

export type IRoleReadRequest = Pick<IRole, 'id_role'>;

export type IRoleReadResponse = IRole;

export type IRoleUpdateRequest = Pick<IRole, 'updated_by'> &
	Partial<Omit<IRole, 'created_at' | 'created_by' | 'sessions'>>;

export type IRoleUpdateResponse = IRole;

export type IRoleListRequest = IListRequest<IRoleFilters>;

export type IRoleListResponse = IListResponse<IRole>;
