export interface IBase {
	status_active: boolean;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date;
	created_by: number;
	updated_by: number;
	deleted_by: number;
}

export interface IListRequest<T> {
	offset: number;
	limit: number;
	deleted?: boolean;
	filter: T;
}

export interface IListResponse<T> {
	count: number;
	rows: T[];
}

export interface IUpdateManyRequest<IFilter, IValues> {
	filter: IFilter;
	values: IValues;
}

export interface IUpdateManyResponse<T> {
	count: number;
	rows: T[];
}

export type DeepNullable<T> = { [K in keyof T]: DeepNullable<T[K]> | null };
