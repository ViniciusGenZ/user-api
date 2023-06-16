import userService from "@services/user";
import { formatResponse } from "@utils/formatResponse";
import { Request, Response } from "express";

export const list = async (req: Request, res: Response) => {
    try {
        const { filter } = req.body

        const limit = Number(req.body.limit ?? 10);
        const offset = Number(req.body.page ?? 0) * limit;

        const users = await userService.list({ limit, offset, filter })
        return formatResponse(res, 200, "OK", users);
    } catch (err) {
        console.log(err)
        return formatResponse(res, 500, "Internal Server Error");
    }
};
