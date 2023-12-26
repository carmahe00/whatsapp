import { sign, verify } from "../utils/token.util"


export const generateToken =async (payload:object, expireIn:string, secret:string) => {
    let token = await sign(payload, expireIn, secret)
    return token
}


export const verifyToken =async (token:string, secret:string) => {
    let check =  await verify(token, secret)
    return check
}