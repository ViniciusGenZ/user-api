import userService from "@services/user";
import { formatResponse } from "@utils/formatResponse";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.decocedJwt;
    const newUser = userService.create({
      ...req.body,
      created_by: user_id,
      updated_by: user_id,
    });
    return formatResponse(res, 200, "OK", newUser);
  } catch (err) {
    return formatResponse(res, 500, "Internal Server Error");
  }
};
