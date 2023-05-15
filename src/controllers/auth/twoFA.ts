import { Request, Response } from "express";
import defaultErrorTreatment from "@errors/defaultErrorTreatment";
import { formatResponse } from "@utils/formatResponse";
import sessionService from "@services/userSession";
import bcrypt from "bcryptjs";
import tokenService from "@services/token";

export const twoFA = async (req: Request, res: Response) => {
  try {
    const { body, decocedJwt } = req;
    const { user_id, id_session } = decocedJwt;

    const session = await sessionService.read({
      id_user_session: id_session as number,
    });

    if (!session) return formatResponse(res, 404, "Session not found");

    if (!(await bcrypt.compare(session?.code as string, body.code))) {
      return formatResponse(res, 401, "Code do not match");
    }

    await sessionService.update({
      filter: {
        id_user_session: session.id_user_session,
      },
      values: {
        authorized: true,
        code_verified: true,
      },
    });

    return formatResponse(
      res,
      200,
      "OK",
      tokenService.generateRespToken(user_id, session.id_user_session, true)
    );
  } catch (err) {
    return defaultErrorTreatment(res, err);
  }
};
