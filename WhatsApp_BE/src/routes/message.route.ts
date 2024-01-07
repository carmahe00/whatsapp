import express from 'express';
import { param, body } from 'express-validator'
import trimRequest from '../middlewares/trim-reques';
import authMiddleware from '../middlewares/auth.middleware';
import { sendMessage, getMessages } from '../controller/message.controller';
import validationResultRequest from '../middlewares/validation-result-request';
const messageRouter = express.Router();
messageRouter.use(trimRequest)
messageRouter.route("/").post([
    body("convo_id").notEmpty().withMessage("it's necessary conversation"),
    authMiddleware,
    validationResultRequest
], sendMessage)
messageRouter.route("/:convo_id").get([
    param("convo_id").notEmpty().withMessage("it's necessary conversation"),
    authMiddleware,
    validationResultRequest],
    getMessages)
export default messageRouter;