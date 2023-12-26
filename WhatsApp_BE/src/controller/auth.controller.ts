import { NextFunction, Response, Request } from "express"
import { createUser, signUser } from "../services/auth.service"
import { generateToken, verifyToken } from "../services/token.service"
import createHttpError from 'http-errors';
import { findUser } from "../services/user.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, picture, status, password } = req.body
        const newUser = await createUser({
            name, email, picture, status, password
        })
        if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET)
            throw createHttpError[500]("Error register user")
        const acces_token = await generateToken(
            { userId: newUser._id },
            "1d",
            process.env.ACCESS_TOKEN_SECRET
        )

        const refresh_token = await generateToken(
            { userId: newUser._id },
            "10d",
            process.env.REFRESH_TOKEN_SECRET
        )
        res.cookie("refreshToken", refresh_token, {
            httpOnly: true,
            path: "/api/v1/auth/refresh-token",
            maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
        })
        return res.status(201).json({
            message: "register success.",
            acces_token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture,
                status: newUser.status,
            }
        })
    } catch (error) {
        next(error)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await signUser(email, password)
        if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET)
            throw createHttpError[500]("Error register user")
        const acces_token = await generateToken(
            { userId: user._id },
            "1d",
            process.env.ACCESS_TOKEN_SECRET
        )

        const refresh_token = await generateToken(
            { userId: user._id },
            "10d",
            process.env.REFRESH_TOKEN_SECRET
        )
        res.cookie("refreshToken", refresh_token, {
            httpOnly: true,
            path: "/api/v1/auth/refresh-token",
            maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
        })
        return res.json({
            message: "register success.",
            acces_token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                status: user.status,
            }
        })
    } catch (error) {
        next(error)
    }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("refreshToken", {
            path: "/api/v1/auth/refresh-token",
        })
        res.json("logged out!")
    } catch (error) {
        next(error)
    }
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refresh_token = req.cookies.refreshToken
        if (!process.env.REFRESH_TOKEN_SECRET || !process.env.ACCESS_TOKEN_SECRET)
            throw createHttpError[500]("Error register user")
        const check:any = await verifyToken(
            refresh_token,
            process.env.REFRESH_TOKEN_SECRET
        )
        const user = await findUser(check.userId)
        const acces_token = await generateToken(
            { userId: user._id },
            "1d",
            process.env.ACCESS_TOKEN_SECRET
        )
        return res.json({
            message: "refresh success.",
            acces_token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                status: user.status,
            }
        })
    } catch (error) {
        next(error)
    }
}