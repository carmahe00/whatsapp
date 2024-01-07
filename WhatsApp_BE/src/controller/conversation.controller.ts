import { NextFunction, Response, Request } from "express"
import { UserToken } from "../middlewares/auth.middleware";
import { createConversation, doesExistConversation, getConversations, populateConversation } from "../services/conversation.service";
import { findUser } from "../services/user.service";

declare global {
    interface AuthenticatedRequest extends Request {
        user?: UserToken;
    }
}
export const createOpenConversation = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const sender_id = req.user?.userId
        const { receiver_id } = req.body
        const existConversation = await doesExistConversation(sender_id!, receiver_id)
        if (existConversation)
            return res.status(200).json(existConversation)

        let receiver_user = await findUser(receiver_id)
        let convoData={
            name: receiver_user.name,
            isGroup: false,
            users: [sender_id, receiver_id]
        }
        const newConvo = await createConversation(convoData)
        const populatedConvo = await populateConversation(newConvo._id, "users", "-password")
        return res.status(200).json(populatedConvo)
    } catch (error) {
        next(error)
    }
}

export const getConversation =async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const sender_id = req.user?.userId
        const conversations = await getConversations(sender_id!)
        res.status(200).json(conversations)
    } catch (error) {
        
    }
}