import { useAppSelector } from "../../../app/store";
import { selectChat } from "../../../features/chatSlice";
import { CallIcon, DotsIcon, SearchLargeIcon } from "../../../svg";
import VideoCallIcon from "../../../svg/VideoCall";
import { capitalize } from '../../../utils/string';
interface Props {
    online: boolean
    callUser: () => void
}
const ChatHeader = ({ online, callUser }: Props) => {
    const { activeConversation } = useAppSelector(rootState => selectChat(rootState));
    return (
        <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none" >
            <div className="w-full flex items-center justify-between">

                {/* Left */}
                <div className="flex items-center gap-x-4">
                    <button className="btn">
                        <img
                            src={activeConversation.picture}
                            alt={`${activeConversation.name}`}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </button>
                    <div className="flex flex-col">

                        <h1 className="dark:text-white text-md font-bold">
                            {activeConversation.name.search(" ") === -1 ?
                                capitalize(activeConversation.name) :
                                capitalize(activeConversation.name.split(" ")[0])
                            }
                        </h1>
                        <span className="text-xs dark:text-dark_svg_2" >{online && "online"}</span>
                    </div>
                </div>
                {/* Right */}
                <ul className="flex items-center gap-x-2.5">
                    <li onClick={callUser}>
                        <button className="btn">
                            <VideoCallIcon />
                        </button>
                    </li>
                    <li>
                        <button className="btn  flex justify-center items-center p-2 -rotate-[35deg]">
                            <CallIcon className="dark:fill-dark_svg_1 scale-75 " />
                        </button>
                    </li>
                    <li>
                        <button className="btn" >
                            <SearchLargeIcon className="dark:fill-dark_svg_1" />
                        </button>
                    </li>
                    <li>
                        <button className="btn" >
                            <DotsIcon className="dark:fill-dark_svg_1" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ChatHeader