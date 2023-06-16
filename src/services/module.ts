import { appDataSource } from "../data-source";
import { Module } from "@entities/Module";
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

async function update(id_modules_sys: number, input: IModuleUpdateRequest) {
  return repository.update({ id_modules_sys }, input);
}

async function del(input: IModuleDeleteRequest) {
  return (await repository.update({ id_modules_sys: input.id_modules_sys }, { status_active: false })).raw[0];
}

async function read({ id_modules_sys }: IModuleReadRequest) {
  return repository.findOne({
    where: {
      id_modules_sys,
      status_active: true,
    },
    relations: {
      permissions: true
    }
  });
}

async function list(input: IModuleListRequest): Promise<IModuleListResponse> {
  console.log(input)
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