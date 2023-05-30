import { Router } from "express";

import { authMiddleware } from "@middlewares/jwt";
import { create } from "@controllers/user/create";
import { userCreateValidation } from "@validations/create";
import { read } from "@controllers/user/read";
import { list } from "@controllers/user/list";
import { sessionMiddleware } from "@middlewares/session";
import { update } from "@controllers/user/update";
import { del } from "@controllers/role/delete";

const userRouter = Router();

userRouter.use(authMiddleware);
userRouter.use(sessionMiddleware);

userRouter.post("/", userCreateValidation, create);
userRouter.get('/:id', read);
userRouter.put('/:id', update);
userRouter.delete('/:id', del);
userRouter.post("/list", list);

export default userRouter;
