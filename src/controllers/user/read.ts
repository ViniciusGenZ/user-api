import userService from "@services/user";
import { formatResponse } from "@utils/formatResponse";
import { Request, Response } from "express";

export const read = async (req: Request, res: Response) => {
  try {
    const user = await userService.read({id_user: Number(req.params.id)}, true)
    return formatResponse(res, 200, "OK", user);
  } catch (err) {
    return formatResponse(res, 500, "Internal Server Error");
  }
};
