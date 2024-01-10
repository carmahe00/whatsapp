import { UserModel } from "../models"
import createHttpError from 'http-errors';

export const findUser = async (userId: string) => {
    const user = await UserModel.findById(userId)
    if (!user)
        throw createHttpError.Unauthorized("Please fill all fields.")
    return user
}

export const searchUser =async (keyword:string, id:string) => {
    const user = await UserModel.find({
        $or:[
            { name: {$regex: keyword, $options: "i"}},
            { email: {$regex: keyword, $options: "i"}}
        ]
    })
    .find({
        _id: {$ne:id}
    })
    return user
}