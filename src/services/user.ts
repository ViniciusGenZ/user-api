import { User } from "@entities/User";
import { IAuthenticationRequest } from "@interfaces/IAuthentication";
import {
  IUser,
  IUserCreateRequest,
  IUserCreateResponse,
  IUserListRequest,
  IUserListResponse,
  IUserReadRequest,
  IUserUpdateRequest,
} from "@interfaces/IUser";
import { appDataSource } from "data-source";
import bcrypt from "bcryptjs";
import { UserSession } from "@entities/UserSession";

const repository = appDataSource.getRepository(User);
const sessionsRepository = appDataSource.getRepository(UserSession);

const userService = {
  repository,
  create,
  read,
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
      status: true,
    },
  });
  if (!user) return null;

  const sessions = await sessionsRepository.find({
    where: {
      status: true,
    },
    order: {
      id_user_session: "DESC",
    },
  });
  user.user_sessions = sessions;

  return user;
}

async function authenticate({
  email,
  password,
}: IAuthenticationRequest): Promise<IUser | null> {
  const user = await repository.findOne({
    where: {
      email,
      status: true,
    },
  });
  if (!user) return null;

  if (await bcrypt.compare(password, user.password)) {
    const sessions = await sessionsRepository.find({
      where: {
        status: true,
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
