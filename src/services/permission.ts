import { appDataSource } from "data-source";
import { IPermissionCreateRequest, IPermissionCreateResponse, IPermissionListRequest, IPermissionListResponse, IPermissionReadRequest, IPermissionUpdateRequest } from "@interfaces/IPermission";
import { Permission } from "@entities/Permission";

const repository = appDataSource.getRepository(Permission);

const moduleService = {
  repository,
  create,
  update,
  read,
  list
};

export default moduleService;

async function create(
  input: IPermissionCreateRequest
): Promise<IPermissionCreateResponse> {
  const newPermission = repository.create(input);
  return repository.save(newPermission);
}

async function update(input: IPermissionUpdateRequest) {
  return repository.update({ id_permission: input.id_permission }, input);
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