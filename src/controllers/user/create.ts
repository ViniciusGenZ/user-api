import userService from "@services/user";
import { formatResponse } from "@utils/formatResponse";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
    // const { user_id } = req.decocedJwt;
    const newUser = await userService.create({
      ...req.body,
      created_by: null, 
      updated_by:  null,
    });
    return formatResponse(res, 200, "OK", newUser);
  } catch (err) {
    console.log(err)
    return formatResponse(res, 500, "Internal Server Error");
  }
};
