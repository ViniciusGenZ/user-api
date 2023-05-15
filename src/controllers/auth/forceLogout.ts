import { Request, Response } from "express";

import { formatResponse } from "@utils/formatResponse";
import defaultErrorTreatment from "@errors/defaultErrorTreatment";
import sessionService from "@services/userSession";
import userService from "@services/user";

export const forceLogout = async (req: Request, res: Response) => {
  try {
    const user = await userService.authenticate(req.body);
    if (!user) return formatResponse(res, 404, "User not found");
    
    await sessionService.update({
      filter: {
        user_id_user: user.id_user,
        status: true,
      },
      values: {
        status: false,
      },
    });

    return formatResponse(res, 200, "Session logout success", {});
  } catch (err) {
    return defaultErrorTreatment(res, err);
  }
};
