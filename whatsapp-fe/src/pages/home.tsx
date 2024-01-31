import { useCallback, useEffect, useState } from 'react'
import { Sidebar } from '../components/sidebar'
import { useAppDispatch, useAppSelector } from '../app/store'
import { selectUser } from '../features/userSlice'
import { getConversation, selectChat, updateMessageAndConversations } from '../features/chatSlice'
import { ChatContainer, WhatsAppHome } from '../components/chat'
import socketContext from '../context/SocketContext';
import { Socket } from 'socket.io-client'
import { Messages } from '../common/common.inteface';
interface Props {
  socket: Socket
}
const Home = ({ socket }: Props) => {
  const dispatch = useAppDispatch()
  const [onlineUsers, setOnlineUsers] = useState<{
    socketId:string
    userId:string
  }[]>([])
  // typing
  const [typing, setTyping] = useState<string>()
  const { user } = useAppSelector(rootState => selectUser(rootState));
  const { activeConversation } = useAppSelector(rootState => selectChat(rootState));
  // Memoize the dispatch function
  const memoizedDispatch = useCallback(dispatch, [dispatch])

  useEffect(() => {
    socket.emit("join", user._id)
    socket.on("get-online-users", (users: any) => {
      setOnlineUsers(users)
    })
  }, [user, socket])

  
  useEffect(() => {
    // Listening and receiving message
    socket.on("receive message", (message: Messages) => {
      if (message.conversation._id === activeConversation._id) {
        memoizedDispatch(updateMessageAndConversations(message))
      }
    })
    socket.on("typing", (conversation) => {
      setTyping(conversation)
    })

    socket.on("stop typing", () => {
      setTyping("")
    })
  }, [socket, activeConversation])

  useEffect(() => {
    if (user.acces_token)
      memoizedDispatch(getConversation(user.acces_token))
  }, [user, memoizedDispatch])

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center overflow-hidden">
      <div className="container h-screen flex">
        <Sidebar onlineUsers={onlineUsers} typing={typing} />

        {
          activeConversation._id ?
            <ChatContainer  onlineUsers={onlineUsers} typing={typing} /> :
            <WhatsAppHome />
        }
      </div>
    </div>
  )
}
const HomeWithSocket = (props: any) => (
  <socketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </socketContext.Consumer>
)
export default HomeWithSocket