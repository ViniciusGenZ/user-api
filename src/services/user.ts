import { User } from "@entities/User";
import { IAuthenticationRequest } from "@interfaces/IAuthentication";
import {
  IUser,
  IUserCreateRequest,
  IUserCreateResponse,
  IUserDeleteRequest,
  IUserListRequest,
  IUserListResponse,
  IUserReadRequest,
  IUserUpdateRequest,
  IUserUpdateResponse,
} from "@interfaces/IUser";
import { appDataSource } from "data-source";
import bcrypt from "bcryptjs";
import { UserSession } from "@entities/UserSession";

// TODO user delete should logout all sessions

const repository = appDataSource.getRepository(User);
const sessionsRepository = appDataSource.getRepository(UserSession);

const userService = {
  repository,
  create,
  read,
  update,
  del,
  list,
  authenticate,
};

export default userService;

async function list(input: IUserListRequest): Promise<IUserListResponse> {
  const [rows, count] = await repository.findAndCount({
    skip: input.offset,
    take: input.limit,
    where: input.filter,
  });

  return { count, rows };
}

async function create(input: IUserCreateRequest): Promise<IUserCreateResponse> {
  const newUser = userService.repository.create(input);
  return repository.save(newUser);
}

async function read(
  input: IUserReadRequest
): Promise<IUserCreateResponse | null> {
  const user = await repository.findOne({
    where: {
      id_user: input.id_user,
      status_active: true,
    },
  });
  if (!user) return null;

  const sessions = await sessionsRepository.find({
    where: {
      users_id_user: user.id_user,
      status_active: true,
    },
    order: {
      id_user_session: "DESC",
    },
  });
  user.user_sessions = sessions;

  return user;
}

async function update(id_user: number, input: IUserUpdateRequest): Promise<IUserUpdateResponse> {
  return (await repository.update({ id_user }, {...input, updated_at: new Date()})).raw[0];
}

async function del({ id_user, by }: IUserDeleteRequest) {
  return (await repository.update({ id_user }, { status_active: false, updated_at: new Date(), deleted_at: new Date(), updated_by: by, deleted_by: by })).raw[0];
}

async function authenticate({
  email,
  password,
}: IAuthenticationRequest): Promise<IUser | null> {
  const user = await repository.findOne({
    where: {
      email,
      status_active: true,
    },
  });
  if (!user) return null;

  if (await bcrypt.compare(password, user.password)) {
    const sessions = await sessionsRepository.find({
      where: {
        status_active: true,
      },
      order: {
        id_user_session: "DESC",
      },
    });
    user.user_sessions = sessions;

    await repository.update(
      {
        id_user: user.id_user,
      },
      {
        login_attempts: 0,
        banned: false,
      }
    );

    return user;
  } else {
    const values: IUserUpdateRequest = {
      login_attempts: user.login_attempts + 1,
      updated_by: user.id_user,
      updated_at: new Date(),
    };

    if (user.login_attempts > 2) {
      const ban_expiration = new Date();
      ban_expiration.setMinutes(ban_expiration.getMinutes() + 15);
      values.ban_expiration = ban_expiration;
      values.banned = true;
    }

    await repository.update(
      {
        id_user: user.id_user,
      },
      values
    );

    throw new Error("Password do not match");
  }
}
