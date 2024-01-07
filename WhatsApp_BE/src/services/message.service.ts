import { Types } from "mongoose";
import { MessageModel } from "../models";
import createHttpError from 'http-errors';

interface Props {
    sender: string | undefined;
    message: any;
    conversation: any;
    files: any;
}

export const createNewMessage = async (data: Props) => {
    let newMessage = await MessageModel.create(data)
    if (!newMessage)
        throw createHttpError.BadRequest("Ooops... Something went wrong")
    return newMessage
}


export const populatedMessage = async (data: Types.ObjectId) => {
    let msg = await MessageModel.findById(data)
        .populate({
            path: "sender",
            select: "name picture",
            model: "User"
        })
        .populate({
            path: "conversation",
            select: "name isGroup users",
            model: "Conversation",
            populate: {
                path: "users",
                select: "name email picture status",
                model: "User"
            }
        })
    if (!msg)
        throw createHttpError.BadRequest("Ooops... Something went wrong")
    return msg
}

export const getConvoMessages = async (convoId: string) => {
    const messages = await MessageModel.find({
        conversation: convoId
    })
        .populate({
            path: "sender",
            select: "name picture email status",
            model: "User"
        })
        .populate("conversation")
    if (!messages)
        throw createHttpError.BadRequest("Ooops... Something went wrong")

    return messages
}