import express from 'express';
import authRouter from './auth.route';
import conversationRouter from './conversation.route';
import messageRouter from './message.route';
const routes = express.Router();
routes.use("/auth", authRouter)
routes.use("/conversation", conversationRouter)
routes.use("/message", messageRouter)
export default routes;
