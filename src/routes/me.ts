import { Router } from "express";
import { sessionMiddleware } from "@middlewares/session";
import { authUserMiddleware } from "@middlewares/user";
import { ipMiddleware } from "@middlewares/ip";
import { twoFAMiddleware } from "@middlewares/twofa";
import { read } from "@controllers/me/read";

const meRouter = Router();

meRouter.use(authUserMiddleware);
meRouter.use(ipMiddleware);
meRouter.use(sessionMiddleware);
meRouter.use(twoFAMiddleware);

meRouter.get("/", read);

export default meRouter;
