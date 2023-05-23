import { Role } from "@entities/Role";
import { IRoleCreateRequest, IRoleCreateResponse, IRoleListRequest, IRoleListResponse, IRoleReadRequest, IRoleUpdateRequest, IRoleUpdateResponse } from "@interfaces/IRole";
import { appDataSource } from "data-source";

const repository = appDataSource.getRepository(Role);

const roleService = {
  repository,
  create,
  update,
  read,
  list
};

export default roleService;

async function create(
  input: IRoleCreateRequest
): Promise<IRoleCreateResponse> {
  const newModuleSession = repository.create(input);
  return repository.save(newModuleSession);
}

async function update(input: IRoleUpdateRequest): Promise<IRoleUpdateResponse> {
  return (await repository.update({ id_role: input.id_role }, input)).raw[0];
}

async function read({ id_role }: IRoleReadRequest) {
  return repository.findOne({
    where: {
        id_role,
      status_active: true,
    },
    relations: {
      permissions: true
    }
  });
}

async function list(input: IRoleListRequest): Promise<IRoleListResponse> {
  const [rows, count] = await repository.findAndCount({
    skip: input.offset,
    take: input.limit,
    where: input.filter,
    relations: {
      permissions: true
    }
  });

  return { count, rows };
}