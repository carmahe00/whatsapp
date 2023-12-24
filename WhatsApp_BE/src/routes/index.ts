import express from 'express';
import authRouter from './auth.route';
const routes = express.Router();
routes.use("/auth", authRouter)
export default routes;