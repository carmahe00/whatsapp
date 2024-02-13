import { NextFunction, Response, Request } from "express"
import { UserToken } from "../middlewares/auth.middleware";
import { logging } from "../configs/logger";
import { createNewMessage, getConvoMessages, populatedMessage } from "../services/message.service";
import { updateLastestMessage } from "../services/conversation.service";

declare global {
    interface AuthenticatedRequest extends Request {
        user?: UserToken;
    }
}

export const sendMessage = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const user_id = req.user?.userId
        
        const { message, convo_id, files } = req.body
        if ((!message && !files) || !convo_id) {
            logging.error("Invalid data pass into the request.")
            return res.sendStatus(400)
        }
        const msgData = {
            sender: user_id,
            message,
            conversation: convo_id,
            files: files || []
        }

        let newMessage = await createNewMessage(msgData)
        let populatedMsg = await populatedMessage(newMessage._id)
        await updateLastestMessage(convo_id, newMessage )
        return res.status(200).json(populatedMsg)
    } catch (error) {
        next(error)
    }
}

export const getMessages = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const convo_id = req.params.convo_id
        if(!convo_id){
            logging.error("Please add conversation id in params")
            return res.sendStatus(400)
        }
        const messages = await getConvoMessages(convo_id)
        return res.json(messages)
    } catch (error) {
        next(error)
    }
}