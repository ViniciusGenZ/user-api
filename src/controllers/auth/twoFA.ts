import { Request, Response } from "express";
import defaultErrorTreatment from "@errors/defaultErrorTreatment";
import { formatResponse } from "@utils/formatResponse";
import sessionService from "@services/userSession";
import bcrypt from "bcryptjs";
import tokenService from "@services/token";
import mailService from "@services/mail";
import userService from "@services/user";
import { IUser } from "@interfaces/IUser";
import lodash from "lodash";

export const twoFA = async (req: Request, res: Response) => {
  try {
    const now = new Date()
    const { body, decodedUserJwt } = req;
    const { user_id, id_session, email, name } = decodedUserJwt;

    const session = await sessionService.read({
      id_user_session: id_session as number,
    });

    if (!session) return formatResponse(res, 404, "Session not found");
    if (session.code_verified) return formatResponse(res, 200, "Session always authorized!");

    if (!(await bcrypt.compare(`${body.code}`, session?.code as string))) {
      return formatResponse(res, 401, "Code do not match");
    }

    const user = await userService.read({ id_user: user_id }, true) as IUser
    const userInResp: Partial<IUser> = lodash.cloneDeep(user)
    delete userInResp.user_sessions
    delete userInResp.password

    await sessionService.update({
      filter: {
        id_user_session: session.id_user_session,
      },
      values: {
        authorized: true,
        code_verified: true,
      },
    });

    await mailService.sendNewSessionNotification({
      address: email,
      name: name
    },
      session.ip,
      session.user_agent,
      now
    )

    return formatResponse(
      res,
      200,
      "OK",
      {
        token: tokenService.generateRespToken(
          user.id_user,
          session?.id_user_session as number,
          true,
          user.email,
          user.name,
          session.ip,
          session.user_agent
        ).token,
        session: {
          id_user_session: session?.id_user_session,
          authorized: true,
          expiration_date: session?.expiration_date,
        },
        user: userInResp
      }
    );
  } catch (err) {
    console.log(err)
    return defaultErrorTreatment(res, err);
  }
};
