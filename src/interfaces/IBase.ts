export interface IBase {
  status: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  created_by: number;
  updated_by: number;
  deleted_by: number;
}

export type IBaseCreateToOmit = Omit<IBase, "created_by" | "updated_by">;

export interface IListRequest<T> {
  offset?: number;
  limit?: number;
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
