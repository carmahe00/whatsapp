import { useEffect, useRef } from "react";
import { useAppSelector } from "../../../app/store";
import { selectChat } from "../../../features/chatSlice";
import { selectUser } from "../../../features/userSlice";
import Message from "./Message";
import Typing from "./Typing";

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
                {messages && messages.map((msg, index) =>
                    <Message message={msg} key={index} me={user._id === msg.sender._id} />
                )}
                {typing === activeConversation._id && <Typing />}
                <div className="mt-2" ref={endRef}></div>
            </div>
        </div>
    )
}

export default ChatMessages