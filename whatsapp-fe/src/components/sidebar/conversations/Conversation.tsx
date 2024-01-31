
import { Socket } from 'socket.io-client'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { ConversationInterface } from '../../../common/common.inteface'
import SocketContext from '../../../context/SocketContext'
import { openCreateConversation, selectChat } from '../../../features/chatSlice'
import { selectUser } from '../../../features/userSlice'
import { getConversationId, getConversationName, getConversationPicture } from '../../../utils/chat.util'
import { dateHandler } from '../../utils/date.utils'

interface Props {
    online: boolean
    convo: ConversationInterface
    socket: Socket
    typing?: string
}
const Conversation = ({ convo, socket, online, typing }: Props) => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(rootState => selectUser(rootState));
    const { activeConversation } = useAppSelector(rootState => selectChat(rootState));

    const value = {
        receiver_id: getConversationId(user, convo.users),
        acces_token: user.acces_token
    }
    const openConversation = async () => {
        let newConvo = await dispatch(openCreateConversation(value))
        newConvo.payload._id && socket.emit("join conversation", newConvo.payload._id)
    }
    console.log(typing, convo._id)
    return (
        <li
            onClick={openConversation}
            className={`list-none 
            h-[72px] 
            w-full 
            dark:bg-dark_bg_1 hover:${convo._id !== activeConversation._id ? 'dark:bg-dark_bg_2' : ''} cursor-pointer dark:text-dark_text_1 px-[10px] ${convo._id === activeConversation._id && "dark:bg-dark_hover_1"}`}
        >
            {/* Container */}
            <div className="relative w-full flex items-center justify-between py-[10px]">
                {/* Left */}
                <div className="flex items-center gap-x-3 justify-evenly w-full">
                    {/* Conversation user picture */}
                    <div className={`relative w-min-[50px] h-[50px] rounded-full overflow-hidden ${online ? 'online' : ''}`}>
                        <img src={getConversationPicture(user, convo.users)} alt={convo.name} className='w-full h-full object-cover' />
                    </div>
                    {/* Conversation name and message*/}
                    <div className='w-full flex flex-col' >
                        <h1 className='font-bold flex items-center gap-x-2' >
                            {getConversationName(user, convo.users)}
                        </h1>
                        {/* Conversation message */}
                        <div >
                            <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                                    {
                                        typing === convo._id ?
                                            <p className='text-green_1' >Typing...</p> :

                                            <p>{convo.latestMessage.message.length > 25 ?
                                                `${convo.latestMessage.message.substring(0, 25)}...` :
                                                convo.latestMessage.message
                                            }</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right */}
                <div className="flex flex-col gap-y-4 items-end text-xs">
                    <span className='dark:text-dark_text_2' >

                        {convo.latestMessage.createdAt ?
                            dateHandler(convo.latestMessage.createdAt) :
                            ""
                        }
                    </span>
                </div>
            </div>
            {/* Border */}
            <div className="ml-16 border-b dark:border-b-dark_border_1">
            </div>
        </li>
    )
}
type ConversationWithContextProps = {
    convo: ConversationInterface
    online: boolean
    typing?: string
};
const ConversationWithContext: React.FC<ConversationWithContextProps> = (props) => (
    <SocketContext.Consumer>
        {(socket) => <Conversation {...props} socket={socket} />}
    </SocketContext.Consumer>
);
export default ConversationWithContext