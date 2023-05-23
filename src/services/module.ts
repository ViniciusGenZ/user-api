import { appDataSource } from "data-source";
import { Module } from "@entities/Modules";
import { IModuleCreateRequest, IModuleCreateResponse, IModuleDeleteRequest, IModuleListRequest, IModuleListResponse, IModuleReadRequest, IModuleUpdateRequest } from "@interfaces/IModule";

const repository = appDataSource.getRepository(Module);

const moduleService = {
  repository,
  create,
  read,
  update,
  del,
  list
};

export default moduleService;

async function create(
  input: IModuleCreateRequest
): Promise<IModuleCreateResponse> {
  const newModuleSession = repository.create(input);
  return repository.save(newModuleSession);
}

async function update(id_module: number, input: IModuleUpdateRequest) {
  return repository.update({ id_module }, input);
}

async function del(input: IModuleDeleteRequest) {
  return (await repository.update({ id_module: input.id_module }, { status_active: false })).raw[0];
}

async function read({ id_module }: IModuleReadRequest) {
  return repository.findOne({
    where: {
      id_module,
      status_active: true,
    },
    relations: {
      permissions: true
    }
  });
}

async function list(input: IModuleListRequest): Promise<IModuleListResponse> {
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