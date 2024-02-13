import { useEffect, useRef } from "react";
import { useAppSelector } from "../../../app/store";
import { selectChat } from "../../../features/chatSlice";
import { selectUser } from "../../../features/userSlice";
import Message from "./Message";
import Typing from "./Typing";
import FileMessage from "./files/FileMessage";

interface Props {
    typing?: string
}

const ChatMessages = ({ typing }: Props) => {
    const endRef = useRef<HTMLDivElement>(null)
    const { user } = useAppSelector(rootState => selectUser(rootState));
    const { messages, activeConversation } = useAppSelector(rootState => selectChat(rootState));
    useEffect(() => {
        scrollBottom()
    }, [messages])
    const scrollBottom = () => {
        if (endRef && endRef.current) {
            endRef.current.scrollIntoView({
                behavior: "smooth"
            })
        }
    }
    return (
        <div className="mb-[60px]">

            <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
                {/* Messages */}
                {messages && messages.map((msg, index) => (
                    <div key={index} >
                        {/* Message Files */}
                        {msg.files.length ?
                            msg.files.map((file, index) =>
                                <FileMessage
                                    fileMessage={file}
                                    key={index+msg._id}
                                    message={msg}
                                    me={user._id === msg.sender._id}
                                />
                            )
                            : null}
                        {/* Message Text */}
                        {
                            msg.message.length > 0 ?
                                <Message message={msg} key={index} me={user._id === msg.sender._id} /> :
                                null
                        }
                    </ div>
                ))}
                {typing === activeConversation._id && <Typing />}
                <div className="mt-2" ref={endRef}></div>
            </div>
        </div>
    )
}

export default ChatMessages