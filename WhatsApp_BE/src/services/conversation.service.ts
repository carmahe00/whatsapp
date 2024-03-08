import { Document, Types } from "mongoose";
import { logging } from "../configs/logger";
import { ConversationModel, UserModel } from "../models"
import createHttpError from 'http-errors';
interface Props {
  name: unknown;
  isGroup: boolean;
  users: any[];
}
export const doesExistConversation = async (sender_id: String, receiver_id: string, isGroup?: boolean| string ) => {
  try {
    if(!isGroup){
      const convos = await ConversationModel.findOne({
        isGroup: false,
        $and: [
          { users: { $elemMatch: { $eq: sender_id } } },
          { users: { $elemMatch: { $eq: receiver_id } } }
        ]
      })
        .populate('users', '-password')
        .populate('latestMessage');
  
  
      // populate message model
      const convo = await ConversationModel.populate(convos, {
        path: "latestMessage",
        select: "name email picture status"
      })
      return convo
    }else{
      let convo = await ConversationModel.findById(isGroup)
        .populate('users admin', '-password')
        .populate('latestMessage');
  
  
      // populate message model
      convo = await ConversationModel.populate(convo, {
        path: "latestMessage",
        select: "name email picture status"
      })
      return convo
    }
  } catch (error) {
    logging.error(error)
    throw createHttpError.InternalServerError("Internal Server Error");
  }
}

export const createConversation = async (data: Props) => {
  const newConvo = await ConversationModel.create(data)
  if (!newConvo) throw createHttpError.BadRequest("Something went wrong...")
  return newConvo
}

export const populateConversation = async (data: Types.ObjectId, fieldToPopulate: string, fieldToRemove: string) => {
  const populateConvo = await ConversationModel.findOne({
    _id: data
  })
    .populate([{ path: fieldToPopulate, strictPopulate: false, select: fieldToRemove }])
  if (!populateConvo) throw createHttpError.BadRequest("Something went wrong...")
  return populateConvo
}

export const getConversations = async (senderId: string) => {
  let conversations
  await ConversationModel.find({
    users: {
      $elemMatch: { $eq: senderId }
    }
  })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({
      updatedAt: -1
    }).then(async (results) => {
      let newResults = await UserModel.populate(results, {
        path: "latestMessage.sender",
        select: "name email picture status"
      })
      conversations = newResults
    }).catch(err => {
      throw createHttpError.BadRequest("Something went wrong...")
    })
  return conversations
}
export const updateLastestMessage = async (convoId: string, msg: Document) => {
  const updatedConvo = await ConversationModel.findByIdAndUpdate(convoId, {
    latestMessage: msg
  })
  if (!updatedConvo) throw createHttpError.BadRequest("Something went wrong...")
  return updatedConvo
}

