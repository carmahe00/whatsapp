import express from 'express';
import { login, logout, register, refreshToken } from '../controller/auth.controller';
import trimRequest from '../middlewares/trim-reques';
const authRouter = express.Router();
authRouter.use(trimRequest)
authRouter.route("/register").post(register)
authRouter.route("/login").post(login)
authRouter.route("/logout").post(logout)
authRouter.route("/refresh-token").post(refreshToken)
export default authRouter;