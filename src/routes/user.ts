import { Router } from "express";

import { create } from "@controllers/user/create";
import { userCreateValidation } from "@validations/create";
import { read } from "@controllers/user/read";
import { list } from "@controllers/user/list";
import { sessionMiddleware } from "@middlewares/session";
import { update } from "@controllers/user/update";
import { del } from "@controllers/role/delete";
import { verifyEmail } from "@controllers/user/emailConfirmation";
import { generateNewEmailConfirmationCode } from "@controllers/user/generateNewEmailConfirmationCode";
import { authUserMiddleware } from "@middlewares/user";

const userRouter = Router();

userRouter.use(authUserMiddleware);
userRouter.use(sessionMiddleware);

// eslint-disable-next-line no-useless-escape
userRouter.get("/newemmailverifcationcode", generateNewEmailConfirmationCode)
userRouter.get('/:id', read);

userRouter.post("/verifyemail", verifyEmail)
userRouter.post("/list", list);

userRouter.put('/:id', update);
userRouter.delete('/:id', del);

userRouter.post("/", userCreateValidation, create);



export default userRouter;
