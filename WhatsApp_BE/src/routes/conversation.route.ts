import express from 'express';
import { body } from 'express-validator'
import trimRequest from '../middlewares/trim-reques';
import authMiddleware from '../middlewares/auth.middleware';
import { createOpenConversation, getConversation } from '../controller/conversation.controller';
import validationResultRequest from '../middlewares/validation-result-request';


const conversationRouter = express.Router();
conversationRouter.use(trimRequest)
conversationRouter.route("/").post([
    authMiddleware,
    body("receiver_id").notEmpty().withMessage('Please provide the user id tha you wanna start a conversation with.'),
    validationResultRequest
], createOpenConversation)

conversationRouter.route("/").get([
    authMiddleware
], getConversation)

export default conversationRouter;