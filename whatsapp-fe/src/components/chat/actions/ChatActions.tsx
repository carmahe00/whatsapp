import { useRef, useState } from "react"
import { SendIcon } from "../../../svg"
import EmojiPickerApp from "./EmojiPicker"
import Input from "./Input"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import { selectChat, sendMessages } from "../../../features/chatSlice"
import { selectUser } from "../../../features/userSlice"
import Spinner from "../../utils/Spinner"
import { Attachments } from "./attachments"
import SocketContext from "../../../context/SocketContext"
import { Socket } from "socket.io-client"
interface Props{
    socket:Socket
}
const ChatActions = ({socket}:Props) => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [showPicker, setShowPicker] = useState(false)
    const [showAttachments, setShowAttachments] = useState(false)
    const [message, setMessage] = useState("")
    const textRef = useRef<HTMLInputElement>(null);
    const { activeConversation, status } = useAppSelector(rootState => selectChat(rootState));
    const { user } = useAppSelector(rootState => selectUser(rootState));

    const sendMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        if (message.length) {
            let newMessage = await dispatch(sendMessages({
                message,
                convo_id: activeConversation._id,
                files: [],
                acces_token: user.acces_token
            }))
            socket.emit("send message", newMessage.payload)
        }
        setMessage("")
        setLoading(false)
    }
    return (
        <form
            onSubmit={sendMessageHandler}
            className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none">
            {/* Container */}
            <div className="w-full flex items-center gap-x-2">
                {/* Emojis and attachments */}
                <ul className="flex gap-x-2" >
                    {/* Emoji Picker */}
                    <EmojiPickerApp
                        showPicker={showPicker}
                        setShowPicker={setShowPicker}
                        textRef={textRef}
                        setMessage={setMessage}
                        message={message}
                        setShowAttachments={setShowAttachments}
                    />
                    <Attachments
                        setShowAttachments={setShowAttachments}
                        showAttachments={showAttachments}
                        setShowPicker={setShowPicker}
                    />
                </ul>
                {/* Input */}
                <Input setMessage={setMessage} message={message} textRef={textRef} />
                {/* Send Button */}
                <button type="submit" className="btn" disabled={status === "loading"} >
                    {
                        status === "loading" && loading ?
                            <Spinner size={25} /> :
                            <SendIcon className="dark:fill-dark_svg_1" />
                    }
                </button>
            </div>
        </form>
    )
}
const ChatActionsContext:React.FC = (props) => (
    <SocketContext.Consumer>
      {(socket) => <ChatActions {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
export default ChatActionsContext