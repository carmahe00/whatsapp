import { NextFunction, Response, Request } from "express"

export const register =async (req: Request, res:Response, next:NextFunction) => {
    try {
        res.send(req.body)
    } catch (error) {
        next(error)
    }
}

export const login =async (req: Request, res:Response, next:NextFunction) => {
    try {
        
    } catch (error) {
        next(error)
    }
}

export const logout =async (req: Request, res:Response, next:NextFunction) => {
    try {
        
    } catch (error) {
        next(error)
    }
}

export const refreshToken =async (req: Request, res:Response, next:NextFunction) => {
    try {
        
    } catch (error) {
        next(error)
    }
}