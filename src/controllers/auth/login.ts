import { Request, Response } from "express";

import { formatResponse } from "../../utils/formatResponse";
import defaultErrorTreatment from "../../errors/defaultErrorTreatment";
import userService from "@services/user";
import sessionService from "@services/userSession";
import tokenService from "@services/token";
import otpGenerator from "otp-generator";
import { IUserSession } from "@interfaces/IUserSession";
import bcrypt from "bcryptjs";
import mailService from "@services/mail";
import { IUser } from "@interfaces/IUser";
import lodash from "lodash";

const updateSessionWithTwoFaCode = async (session: IUserSession) => {
  const code_expiration = new Date();
  code_expiration.setHours(code_expiration.getHours() + 1);

  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
  });

  const code = await bcrypt.hash(otp, 6);

  await sessionService.update({
    filter: {
      id_user_session: session?.id_user_session,
    },
    values: {
      code,
      code_expiration: code_expiration,
    },
  });
  return otp;
};

export const login = async (req: Request, res: Response) => {
  const { ip, useragent, body } = req;
  const expiration_date = new Date();
  expiration_date.setHours(expiration_date.getHours() + 4);

  try {
    const user = await userService.authenticate(body);
    if (!user) return formatResponse(res, 404, "User not found");

    const userInResp: Partial<IUser> = lodash.cloneDeep(user)
    delete userInResp.user_sessions
    delete userInResp.password

    const hasSession = user.user_sessions.filter((item) => item.ip === ip);
    if (hasSession.length > 0) {
      if (
        user.allow_multiple_sessions ||
        hasSession.some((item) => item.user_agent === useragent?.source)
      ) {
        const session = hasSession.find(
          (item) => item.user_agent === useragent?.source
        );
        if (!session?.authorized) {
          const otp = await updateSessionWithTwoFaCode(session as IUserSession);
          await mailService.sendOtp({
            name: user.name,
            address: user.email
          }, otp)
        }
        return formatResponse(
          res,
          200,
          "OK",
          {
            token: tokenService.generateRespToken(
              user.id_user,
              session?.id_user_session as number,
              session?.authorized as boolean,
              user.email,
              user.name
            ),
            session: {
              id_user_session: session?.id_user_session,
              authorized: session?.authorized,
              expiration_date: session?.expiration_date,
            },
            user: userInResp
          }
        );
      }

      const whereIsActive = hasSession.length == 1 ? hasSession[0] : null;
      return formatResponse(res, 401, `Already have an active session`, {
        ip: whereIsActive?.ip,
        useragent: whereIsActive?.user_agent,
      });
    }

    if (user.user_sessions.length > 0) {
      const whereIsActive = hasSession.length == 1 ? hasSession[0] : null;
      return formatResponse(res, 401, `Already have an active session`, {
        ip: whereIsActive?.ip,
        useragent: whereIsActive?.user_agent,
      });
    }
    const session = await sessionService.create({
      ip,
      expiration_date,
      user_agent: useragent?.source as string,
      users_id_user: user.id_user,
      created_by: 1,
      updated_by: 1,
      session_types_id_session_type: 1,
    });
    user.user_sessions.push(session);

    const otp = await updateSessionWithTwoFaCode(session as IUserSession);
    await mailService.sendOtp({
      name: user.name,
      address: user.email
    }, otp)

    return formatResponse(
      res,
      200,
      "OK",
      {
        token: tokenService.generateRespToken(
          user.id_user,
          session?.id_user_session as number,
          session?.authorized as boolean,
          user.email,
          user.name
        ),
        session: {
          id_user_session: session?.id_user_session,
          authorized: session?.authorized,
          expiration_date: session?.expiration_date,
        },
        user: userInResp
      }
    );
  } catch (err) {
    console.log(err);
    return defaultErrorTreatment(res, err);
  }
};
