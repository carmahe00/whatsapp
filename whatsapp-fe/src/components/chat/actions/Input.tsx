import React, { useState } from "react";
import SocketContext from "../../../context/SocketContext";
import { Socket } from "socket.io-client";
import { useAppSelector } from "../../../app/store";
import { selectChat } from "../../../features/chatSlice";

interface Props  {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    textRef:React.RefObject<HTMLInputElement>
    socket: Socket
}
const Input = ({message, setMessage, textRef, socket}:Props) => {
    const [typing, setTyping] = useState(false)
    const { activeConversation } = useAppSelector(rootState => selectChat(rootState));
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setMessage(e.currentTarget.value)
        if(!typing){
            setTyping(true)
            socket.emit("typing", activeConversation._id)
        }
        let lastTypingTime = new Date().getTime()
        let timer = 2000
        setTimeout(() => {
            let timeNow = new Date().getTime()
            let timeDiff = timeNow - lastTypingTime
            if(timeDiff >= timer && typing){

                socket.emit("stop typing", activeConversation._id)
                setTyping(false)
            }
        }, timer);
    }
    return (
        <div className="w-full" >
            <input
                type="text"
                className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
                placeholder="Type a message"
                value={message}
                onChange={onChange}
                ref={textRef}
            />
        </div>
    )
}
type InputContextProps = {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    textRef:React.RefObject<HTMLInputElement>
  };

  const InputSocket:React.FC<InputContextProps> = (props) => (
    <SocketContext.Consumer>
      {(socket) => <Input {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
  export default InputSocket