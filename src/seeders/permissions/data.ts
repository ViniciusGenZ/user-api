import { IHttpMethodsEnum } from '@interfaces/IHttpMethodsEnum';
import { IPermissionCreateRequest } from '@interfaces/IPermission';

export const permissionsData: Array<IPermissionCreateRequest> = [
	{
		url_access: '',
		created_by: 1,
		updated_by: 1,
		status_active: true,
		method: IHttpMethodsEnum.POST,
		modules_sys_id_modules_sys: 0,
		created_at: new Date(),
	},
];
