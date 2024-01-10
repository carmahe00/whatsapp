import { User } from '../../../common/common.inteface'
interface Props {
    contact: User
}
const Contact = ({
    contact
}: Props) => {
    return (
        <li className='list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px] ' >
            <div className="flex items-center gap-x-3 py-[10px]">
                {/* Contact */}
                <div className="flex items-center gap-x-3 justify-evenly w-full">
                    {/* Conversation user picture */}
                    <div className="relative w-min-[50px] h-[50px] rounded-full overflow-hidden">
                        <img src={contact.picture} alt={contact.name} className='w-full h-full object-cover' />
                    </div>
                    {/* Conversation name and message*/}
                    <div className='w-full flex flex-col' >
                        <h1 className='font-bold flex items-center gap-x-2' >
                            {contact.name}
                        </h1>
                        {/* Conversation message */}
                        <div className="">
                            <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                                    <p>{contact.status}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
        </li>
    )
}

export default Contact