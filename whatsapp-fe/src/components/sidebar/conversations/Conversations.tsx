
import { useAppSelector } from '../../../app/store'
import { selectChat } from '../../../features/chatSlice'
import { selectUser } from '../../../features/userSlice';
import { checkOnlineStatus } from '../../../utils/chat.util';
import Conversation from './Conversation'

interface Props {
  onlineUsers: {
      socketId: string;
      userId: string;
  }[]
  typing?:string
}
const Conversations = ({onlineUsers, typing}:Props) => {
    const { conversations, activeConversation } = useAppSelector(selectChat)
    const { user } = useAppSelector(selectUser)
  return (
    <div className="convos scrollbar">
        <ul>

        {
            conversations.length && conversations
            .filter(c =>c.latestMessage || activeConversation._id === c._id)
            .map((convo, i)=>{
              let checkout = checkOnlineStatus(onlineUsers, user, convo.users)
              return <Conversation convo={convo} key={i} online={checkout ? true : false} typing={typing} />
            }
            )
        }
        </ul>
    </div>
  )
}

export default Conversations