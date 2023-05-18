import { Router } from "express";

import { authMiddleware } from "@middlewares/jwt";
import { create } from "@controllers/user/create";
import { userCreateValidation } from "@validations/create";
import { read } from "@controllers/user/read";
import { list } from "@controllers/user/list";
import { sessionMiddleware } from "@middlewares/session";

const userRouter = Router();

userRouter.use(authMiddleware);
userRouter.use(sessionMiddleware);

userRouter.get('/:id', read);
userRouter.post("/", userCreateValidation, create);
userRouter.post("/list", list)

export default userRouter;
