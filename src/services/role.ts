import { Role } from "@entities/Role";
import { IRoleCreateRequest, IRoleCreateResponse, IRoleDeleteRequest, IRoleDeleteResponse, IRoleListRequest, IRoleListResponse, IRoleReadRequest, IRoleUpdateRequest, IRoleUpdateResponse } from "@interfaces/IRole";
import { appDataSource } from "../data-source";

const repository = appDataSource.getRepository(Role);

const roleService = {
  repository,
  create,
  read,
  update,
  del,
  list,
};

export default roleService;

async function create(
  input: IRoleCreateRequest
): Promise<IRoleCreateResponse> {
  const newModuleSession = repository.create(input);
  return repository.save(newModuleSession);
}

async function update(id_role: number, input: IRoleUpdateRequest): Promise<IRoleUpdateResponse> {
  return (await repository.update({ id_role }, {...input, updated_at: new Date()})).raw[0];
}

async function del({id_role, by}: IRoleDeleteRequest): Promise<IRoleDeleteResponse> {
  return (await repository.update({ id_role }, { status_active: false, updated_at: new Date(), deleted_at: new Date(), updated_by: by, deleted_by: by })).raw[0];
}

async function read({ id_role }: IRoleReadRequest) {
  return repository.findOne({
    where: {
      id_role,
      status_active: true,
    },
  });
}

async function list(input: IRoleListRequest): Promise<IRoleListResponse> {
  const [rows, count] = await repository.findAndCount({
    skip: input.offset,
    take: input.limit,
    where: input.filter,
  });

  return { count, rows };
}