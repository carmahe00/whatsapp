import { NextFunction, Response, Request } from "express"
import { searchUser as searchUserService } from "../services/user.service"
import { UserToken } from "../middlewares/auth.middleware";
import createHttpError from 'http-errors';
declare global {
    interface AuthenticatedRequest extends Request {
        user?: UserToken;
    }
}
export const searchUsers = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {

        if (!req.user?.userId)
            throw createHttpError.BadRequest("Opps... something went wrong")
        const id = req.user?.userId
        const keyword = req.query.search as string
        const user = await searchUserService(keyword!, id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}