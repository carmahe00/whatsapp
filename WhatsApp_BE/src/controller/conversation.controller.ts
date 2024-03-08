import { NextFunction, Response, Request } from "express"
import { UserToken } from "../middlewares/auth.middleware";
import { createConversation, doesExistConversation, getConversations, populateConversation } from "../services/conversation.service";
import { findUser } from "../services/user.service";
import createHttpError from 'http-errors';

declare global {
    export interface AuthenticatedRequest extends Request {
        user?: UserToken;
    }
}
export const createOpenConversation = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const sender_id = req.user?.userId
        const { receiver_id, isGroup } = req.body
        if (!isGroup) {
            const existConversation = await doesExistConversation(sender_id!, receiver_id, false)
            if (existConversation)
                return res.status(200).json(existConversation)

            let receiver_user = await findUser(receiver_id)
            let convoData = {
                name: receiver_user.name,
                picture: receiver_user.picture,
                isGroup: false,
                users: [sender_id, receiver_id]
            }
            const newConvo = await createConversation(convoData)
            const populatedConvo = await populateConversation(newConvo._id, "users", "-password")
            return res.status(200).json(populatedConvo)
        }else{
            // It's a group chat
            // check if group chat exists
            const existGroupConversation = await doesExistConversation("", "", isGroup)
            res.status(200).json(existGroupConversation)
        }
    } catch (error) {
        next(error)
    }
}

export const getConversation = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const sender_id = req.user?.userId
        const conversations = await getConversations(sender_id!)
        res.status(200).json(conversations)
    } catch (error) {
        next(error)
    }
}


export const createGroup = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { name, users } = req.body
    users.push(req.user?.userId)
    if (!name || users.length < 2)
        throw createHttpError.BadRequest("Plase fill all fields.")

    let convoData = {
        name,
        users,
        isGroup: true,
        admin: req.user?.userId,
        picture: process.env.DEFAULT_GROUP_PICTURE
    }
    try {
        const newConvo = await createConversation(convoData)
        const populateConvo = await populateConversation(newConvo._id, "users admin", "-password")
        console.log(populateConvo)
        res.status(200).json(populateConvo)
    } catch (error) {
        next(error)
    }
}