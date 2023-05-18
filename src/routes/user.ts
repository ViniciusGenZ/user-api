import { Router } from "express";

import { authMiddleware } from "@middlewares/jwt";
import { create } from "@controllers/user/create";
import { userCreateValidation } from "@validations/create";
import { read } from "@controllers/user/read";
import { list } from "@controllers/user/list";

const userRouter = Router();

userRouter.get('/:id', read);
userRouter.post("/", userCreateValidation, create);
userRouter.post("/list", list)
userRouter.use(authMiddleware);



export default userRouter;
