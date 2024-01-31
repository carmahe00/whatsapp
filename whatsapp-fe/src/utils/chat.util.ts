
import { User as UserConvo } from '../common/common.inteface'
import { User } from '../features/userSlice'

export const getConversationId = (currentUser:User, users: UserConvo[]) => {

  return  users[0]._id === currentUser._id ? users[1]._id : users[0]._id
}
export const getConversationName = (currentUser:User, users: UserConvo[]) => {

  return  users[0]._id === currentUser._id ? users[1].name : users[0].name
}

export const getConversationPicture = (currentUser:User, users: UserConvo[]) => {

  return  users[0]._id === currentUser._id ? users[1].picture : users[0].picture
}

export const checkOnlineStatus = (onlineUsers:{
  socketId: string;
  userId: string;
}[], user:User, users:UserConvo[])=>{
  let convoId = getConversationId(user, users)
  let check = onlineUsers.find(u => u.userId === convoId)
  return check ? true : false
}