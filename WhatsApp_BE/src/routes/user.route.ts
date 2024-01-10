import express from 'express';
import { query } from 'express-validator'

import trimRequest from '../middlewares/trim-reques';
import authMiddleware from '../middlewares/auth.middleware';
import { searchUsers } from '../controller/user.controller';
import validationResultRequest from '../middlewares/validation-result-request';
const userRouter = express.Router();
userRouter.use(trimRequest)
userRouter.route("/").get([
    query("search").notEmpty().withMessage("Please add search term."),
    authMiddleware,
    validationResultRequest
], searchUsers)
export default userRouter;