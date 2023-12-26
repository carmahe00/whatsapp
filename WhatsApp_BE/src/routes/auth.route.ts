import express, { Request, Response } from 'express';
import { body, cookie } from 'express-validator'

import { login, logout, register, refreshToken } from '../controller/auth.controller';
import trimRequest from '../middlewares/trim-reques';
import validationResultRequest from '../middlewares/validation-result-request';
import authMiddleware from '../middlewares/auth.middleware';
const authRouter = express.Router();
authRouter.use(trimRequest)
authRouter.route("/register").post([
    body("email").trim().isEmail().withMessage('Not a valid e-mail address'),
    body("status").isLength({ max: 65 }).withMessage('Please make sure your status is less than 64 characters.'),
    body("name").trim().notEmpty().isLength({ min: 3, max: 25 }).withMessage('Please make sure your name is between 3 and 25 characters.'),
    body("password").trim().notEmpty().isLength({ min: 6, max: 125 }).withMessage('Please make sure your name is between 6 and 125 characters.'),
    validationResultRequest
], register)
authRouter.route("/login").post([
    body("email").trim().isEmail().withMessage('Not a valid e-mail address'),
    body("password").trim().notEmpty(),
    validationResultRequest
], login)
authRouter.route("/logout").post(logout)
authRouter.route("/refresh-token").post([
    cookie("refreshToken").notEmpty().withMessage("Please login."),
    validationResultRequest
], refreshToken)

authRouter.route("/test-middleware").get([authMiddleware], (req: AuthenticatedRequest, res: Response) => {
    res.send(req.user)
})
export default authRouter;