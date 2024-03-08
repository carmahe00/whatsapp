
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
  typing?: string
}
const Conversations = ({ onlineUsers, typing }: Props) => {
  const { user } = useAppSelector(selectUser)
  const { conversations, activeConversation } = useAppSelector(selectChat)
  return (
    <div className="convos scrollbar">
      <ul>

        {
          conversations.length && conversations
            .filter(c => c.latestMessage || activeConversation._id === c._id || c.isGroup === true)
            .map((convo, i) => {
              let checkout = checkOnlineStatus(onlineUsers, user, convo.users)
              return <Conversation convo={convo} key={i} online={!convo.isGroup && checkout ? true : false} typing={typing} />
            }
            )
        }
      </ul>
    </div>
  )
}

export default Conversations