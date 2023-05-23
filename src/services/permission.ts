import { appDataSource } from "data-source";
import { IPermissionCreateRequest, IPermissionCreateResponse, IPermissionDeleteRequest, IPermissionListRequest, IPermissionListResponse, IPermissionReadRequest, IPermissionUpdateRequest } from "@interfaces/IPermission";
import { Permission } from "@entities/Permission";

const repository = appDataSource.getRepository(Permission);

const permissionService = {
  repository,
  create,
  update,
  read,
  del,
  list,
};

export default permissionService;

async function create(
  input: IPermissionCreateRequest
): Promise<IPermissionCreateResponse> {
  const newPermission = repository.create(input);
  return repository.save(newPermission);
}

async function update(id_permission: number, input: IPermissionUpdateRequest) {
  return repository.update({ id_permission }, {...input, updated_at: new Date()});
}

async function del({ id_permission, by }: IPermissionDeleteRequest) {
  return (await repository.update({ id_permission }, { status_active: false, updated_at: new Date(), deleted_at: new Date(), updated_by: by, deleted_by: by })).raw[0];
}

async function read({ id_permission }: IPermissionReadRequest) {
  return repository.findOne({
    where: {
      id_permission,
      status_active: true,
    },
    relations: {
      module: true
    }
  });
}

async function list(input: IPermissionListRequest): Promise<IPermissionListResponse> {
  const [rows, count] = await repository.findAndCount({
    skip: input.offset,
    take: input.limit,
    where: input.filter,
    relations: {
      module: true
    }
  });

  return { count, rows };
}