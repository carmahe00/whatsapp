import { UserModel } from "../models"
import createHttpError from 'http-errors';
import { Password } from "./password.service";
interface Props { name: string, email: string, picture: string, status: string, password: string }

export const createUser = async (params: Props) => {
    const { email, name, password, picture, status } = params
    const checkDB = await UserModel.findOne({
        email,
    })
    if (checkDB)
        throw createHttpError.Conflict("Please try again with a different email address.")

    const user = await new UserModel({
        email,
        name,
        password,
        picture: picture || process.env.DEFAULT_PICTURE,
        status: status || process.env.DEFAULT_STATUS
    }).save()
    return user
}


export const signUser = async (email: string, password: string) => {
    const checkDB = await UserModel.findOne({
        email: email.toLowerCase(),
    })
    if (!checkDB)
        throw createHttpError.Unauthorized("Invalid credentials.")

    const result = await Password.compare(checkDB.password as string, password)
    if (!result)
        throw createHttpError.Unauthorized("Invalid credentials.")
    return checkDB
}