import { NextFunction, Request, Response } from "express";
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
export interface UserToken {
    userId: string;
    iat:    number;
    exp:    number;
}

declare global {
    interface AuthenticatedRequest extends Request {
        user?: UserToken;
    }
}
export default async function (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (!process.env.ACCESS_TOKEN_SECRET)
        throw createHttpError[500]("Error register user")
    if (!req.headers["authorization"])
        return next(createHttpError.Unauthorized("Not Authorized"))
    const bearerToken = req.headers["authorization"]
    let token = bearerToken.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err)
            next(createHttpError.Unauthorized("Not Authorized"))
        console.log(typeof payload)
        req.user = payload as UserToken
        next()
    })
}