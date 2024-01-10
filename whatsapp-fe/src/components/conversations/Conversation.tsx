
import { ConversationInterface } from '../../common/common.inteface'
import { dateHandler } from '../utils/date.utils'

interface Props {
    convo: ConversationInterface
}
const Conversation = ({
    convo
}: Props) => {
    return (
        <li className='list-none h-[72px] w-full dark:bg-dark_bg_1 hover:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]' >
            {/* Container */}
            <div className="relative w-full flex items-center justify-between py-[10px]">
                {/* Left */}
                <div className="flex items-center gap-x-3 justify-evenly w-full">
                    {/* Conversation user picture */}
                    <div className="relative w-min-[50px] h-[50px] rounded-full overflow-hidden">
                        <img src={convo.pucture} alt={convo.name} className='w-full h-full object-cover' />
                    </div>
                    {/* Conversation name and message*/}
                    <div className='w-full flex flex-col' >
                        <h1 className='font-bold flex items-center gap-x-2' >
                            {convo.name}
                        </h1>
                        {/* Conversation message */}
                        <div className="">
                            <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                                    <p>{convo.latestMessage.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right */}
                <div className="flex flex-col gap-y-4 items-end text-xs">
                    <span className='dark:text-dark_text_2' >
                        
                        { convo.latestMessage.createdAt && dateHandler(convo.latestMessage.createdAt)}
                    </span>
                </div>
            </div>
            {/* Border */}
            <div className="ml-16 border-b dark:border-b-dark_border_1">
            </div>
        </li>
    )
}

export default Conversation