import { UserModel } from "../models"
import createHttpError from 'http-errors';

export const findUser = async (userId: string) => {
    const user = await UserModel.findById(userId)
    if (!user)
        throw createHttpError.Unauthorized("Please fill all fields.")
    return user
}