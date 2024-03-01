import { useCallback, useEffect, useRef, useState } from 'react'
import Peer from 'simple-peer'
import { Sidebar } from '../components/sidebar'
import { useAppDispatch, useAppSelector } from '../app/store'
import { selectUser } from '../features/userSlice'
import { getConversation, selectChat, updateMessageAndConversations } from '../features/chatSlice'
import { ChatContainer, WhatsAppHome } from '../components/chat'
import socketContext from '../context/SocketContext';
import { Socket } from 'socket.io-client'
import { Messages } from '../common/common.inteface';
import Call from '../components/chat/calls/Call'
import { getConversationId, getConversationName, getConversationPicture } from '../utils/chat.util'
interface Props {
  socket: Socket
}

export interface CallProps {
  receiveingCall: boolean;
  callEnded: boolean;
  socketId: string;
  name: string;
  picture: string;
  signal?: any
}

const callData: CallProps = {
  receiveingCall: false,
  callEnded: false,
  socketId: "",
  name: "",
  picture: "",
  signal: ""
}
const Home = ({ socket }: Props) => {
  const dispatch = useAppDispatch()
  const [onlineUsers, setOnlineUsers] = useState<{
    socketId: string
    userId: string
  }[]>([])
  // call
  const [show, setShow] = useState(false);
  const [totalSecInCall, setTotalSecInCall] = useState(0)
  const [call, setCall] = useState(callData)
  const [stream, setStream] = useState<MediaStream>({} as MediaStream)

  const [callAccepted, setCallAccepted] = useState(false)
  const myVideo = useRef<HTMLVideoElement>(null)
  const userVideo = useRef<HTMLVideoElement>(null)
  const connectionRef = useRef<Peer.Instance>()
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

  // call
  useEffect(() => {
    setupMedia()
    socket.on("setup socket", id => {
      setCall({ ...call, socketId: id })
    })
    socket.on("end call", () => {
      setShow(false)
      setCall({ ...call, callEnded: true, receiveingCall: false })
      myVideo.current!.srcObject = null
      if (callAccepted )
        connectionRef.current?.destroy()
    })
    socket.on("call user", data => {
      setCall({
        ...call,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receiveingCall: true
      })
    })
  }, [])

  // call user function
  const callUser = () => {
    enableMedia()
    setCall({ ...call, name: getConversationName(user, activeConversation.users), picture: getConversationPicture(user, activeConversation.users) })
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    })
    peer.on("signal", data => {
      socket.emit("call user", {
        userToCall: getConversationId(user, activeConversation.users),
        signal: data,
        from: call.socketId,
        name: user.name,
        picture: user.picture
      })
    })
    peer.on("stream", stream => {
      userVideo.current!.srcObject = stream
    })
    socket.on("call accepted", (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })
    connectionRef.current = peer
  }

  // answer call function
  const answerCall = () => {
    enableMedia()
    setCallAccepted(true)
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream
    })
    peer.on("signal", data => {
      socket.emit("answer call", { signal: data, to: call.socketId })
    })

    peer.on("stream", stream => {
      userVideo.current!.srcObject = stream
    })

    peer.signal(call.signal) // call user
    connectionRef.current = peer
  }

  // end call function
  const endCall = () => {
    setShow(false);
    setCall({ ...call, callEnded: true, receiveingCall: false });

    myVideo.current!.srcObject = null;
    socket.emit("end call", call.socketId);
    connectionRef?.current?.destroy();
  }

  const setupMedia = () => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })
      .then(stream => {
        setStream(stream)
      })
  }

  const enableMedia = () => {
    myVideo.current!.srcObject = stream
    setShow(true)
  }
  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center overflow-hidden">
        <div className="container h-screen flex">
          <Sidebar onlineUsers={onlineUsers} typing={typing} />

          {
            activeConversation._id ?
              <ChatContainer onlineUsers={onlineUsers} typing={typing} callUser={callUser} /> :
              <WhatsAppHome />
          }
        </div>
      </div>


      <div className={(show || call.signal) && !call.callEnded ? "" : "hidden"}>
        <Call
          call={call}
          setCall={setCall}
          myVideo={myVideo}
          callAccepted={callAccepted}
          userVideo={userVideo}
          stream={stream}
          answerCall={answerCall}
          endCall={endCall}
          totalSecInCall={totalSecInCall}
          setTotalSecInCall={setTotalSecInCall}
        />
      </div>

    </>
  )
}
const HomeWithSocket = (props: any) => (
  <socketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </socketContext.Consumer>
)
export default HomeWithSocket