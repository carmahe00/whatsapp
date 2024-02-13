import moment from "moment"
import TraingleIcon from "../../../../svg/Triangle"
import { Messages } from "../../../../common/common.inteface"
import FileImageVideo from "./FileImageVideo"
import FileOthers from "./FileOthers"
interface Props {
    fileMessage: any
    message: Messages
    me: boolean
}
const FileMessage = ({ fileMessage, me, message }: Props) => {
    return (
        <div
            className={`w-full flex mt-2 space-x-3 max-w-xs ${me ? "ml-auto justify-end " : ""
                }`}
        >
            {/*Message Container*/}
            <div className="relative">
                {/* sender user message */}
                {!me && message.conversation.isGroup && (
                    <div className="absolute top-0.5 left-[-37px]">
                        <img
                            src={message.sender.picture}
                            alt=""
                            className="w-8 h-8 rounded-full"
                        />
                    </div>
                )}
                <div
                    className={`relative h-full dark:text-dark_text_1 rounded-lg
        ${me ? "border-[3px] border-green_3" : "dark:bg-dark_bg_2"}
        ${me && fileMessage.file.public_id.split(".")[1] === "png" ? "bg-transparent !border-none" : "bg-green_3 p-1"}
        `}
                >
                    {/*Message*/}
                    <div className={`h-full text-sm ${fileMessage.type !== "IMAGE" && fileMessage.type !== "VIDEO" && "pb-5"}`}>
                        {
                            fileMessage.type === "IMAGE" || fileMessage.type === "VIDEO" ?
                                <FileImageVideo type={fileMessage.type} secureUrl={fileMessage.file.secure_url as string} /> :
                                <FileOthers file={fileMessage} type={fileMessage.type} />
                        }
                    </div>
                    {/*Message Date*/}
                    <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none">
                        {moment(message.createdAt).format("HH:mm")}
                    </span>
                    {/*Traingle*/}
                    {!me ? (
                        <span>
                            <TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default FileMessage