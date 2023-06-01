import { Router } from "express";

import { authMiddleware } from "@middlewares/jwt";
import { create } from "@controllers/user/create";
import { userCreateValidation } from "@validations/create";
import { read } from "@controllers/user/read";
import { list } from "@controllers/user/list";
// import { sessionMiddleware } from "@middlewares/session";
import { update } from "@controllers/user/update";
import { del } from "@controllers/role/delete";
import { verifyEmail } from "@controllers/user/emailConfirmation";
import { generateNewEmailConfirmationCode } from "@controllers/user/generateNewEmailConfirmationCode";

const userRouter = Router();

userRouter.use(authMiddleware);
// userRouter.use(sessionMiddleware);

userRouter.post("/", userCreateValidation, create);
// eslint-disable-next-line no-useless-escape
userRouter.get("/newemmailverifcationcode", generateNewEmailConfirmationCode)
userRouter.post("/verifyemail", verifyEmail)
userRouter.post("/list", list);
userRouter.get('/:id', read);
userRouter.put('/:id', update);
userRouter.delete('/:id', del);




export default userRouter;
