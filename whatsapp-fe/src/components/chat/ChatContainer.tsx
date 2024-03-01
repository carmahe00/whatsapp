
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { getConversationMessages, selectChat } from '../../features/chatSlice';
import { ChatHeader } from './index'
import ChatMessages from './messages/ChatMessages'
import { selectUser } from '../../features/userSlice';
import { ChatActions } from './actions';
import { checkOnlineStatus } from '../../utils/chat.util';
import FilesPreview from './preview/files/FilesPreview';
interface Props {
  onlineUsers: {
    socketId: string;
    userId: string;
  }[]
  typing?: string
  callUser:() => void
}
const ChatContainer = ({ onlineUsers, typing, callUser }: Props) => {
  const dispatch = useAppDispatch()
  // Memoize the dispatch function
  const memoizedDispatch = useCallback(dispatch, [dispatch])
  const { user } = useAppSelector(rootState => selectUser(rootState));
  const { activeConversation, files } = useAppSelector(rootState => selectChat(rootState));
  useEffect(() => {

    if (activeConversation._id && user.acces_token) {
      memoizedDispatch(getConversationMessages({
        acces_token: user.acces_token,
        convo_id: activeConversation._id
      }))
    }
  }, [activeConversation, memoizedDispatch, user])
  return (
    <div className="relative w-full  h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden bg-center bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat" >
      {/* Container */}

      {/* Chat Header */}
      <ChatHeader callUser={callUser} online={checkOnlineStatus(onlineUsers, user, activeConversation.users)} />
      {
        files.length > 0 ?
          <FilesPreview /> :
          <>
            {/* Chat Message */}
            <ChatMessages typing={typing} />
            {/* Chat Actions */}
            <ChatActions />
          </>
      }
    </div>
  )
}

export default ChatContainer