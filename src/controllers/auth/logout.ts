import { Request, Response } from "express";

import defaultErrorTreatment from "@errors/defaultErrorTreatment";
import { formatResponse } from "@utils/formatResponse";
import sessionService from "@services/userSession";

export const logout = async (req: Request, res: Response) => {
  try {
    const { user_id, id_session } = req.decocedJwt;
    await sessionService.update({
      filter: {
        user_id_user: user_id,
        id_user_session: id_session,
        status: true,
      },
      values: {
        status: false,
      },
    });

    return formatResponse(res, 200, "Session logged out with success");
  } catch (err) {
    return defaultErrorTreatment(res, err);
  }
};
