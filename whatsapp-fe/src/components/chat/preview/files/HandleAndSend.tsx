import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { removeFileFromFiles, selectChat, sendMessages } from "../../../../features/chatSlice";
import { CloseIcon, SendIcon } from "../../../../svg";
import { uploadFiles } from "../../../../utils/upload";
import Add from "./Add";
import { selectUser } from "../../../../features/userSlice";
import SocketContext from "../../../../context/SocketContext";
import { Socket } from "socket.io-client";
import Spinner from "../../../utils/Spinner";
interface Props {
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  message: string
  socket: Socket
}

const HandleAndSend = ({ activeIndex, setActiveIndex, message, socket }: Props) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const { files, activeConversation } = useAppSelector(rootState => selectChat(rootState));
  const { user } = useAppSelector(rootState => selectUser(rootState));
  // send messahe handler
  const sendMessageHandle = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Upload files first
      const uploaded_files = await uploadFiles(files)
      // Send the message
      const values = {
        acces_token: user.acces_token,
        message,
        convo_id: activeConversation._id,
        files: uploaded_files.length > 0 ? uploaded_files : [],
      }
      let newMsg = await dispatch(sendMessages(values))
      socket.emit("send message", newMsg.payload)
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false)
    }
  }
  // Handle remove file
  const handleRemoveFile = (index: number) => {
    dispatch(removeFileFromFiles(index))
  }
  return (
    <div className="w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2" >
      {/* Empty */}
      <span></span>
      <div className="flex items-center gap-x-2">
        {
          files.map((file, i) => (
            <div className="relative fileThumbnail" key={i}>
              <div
                className={`
              
              w-14 
              mt-2
              h-14 
              border 
              dark:border-white
              rounded-md
            ${activeIndex === i ? 'border-[3px] !border-green_1' : ""}
            `}
                onClick={() => {
                  setActiveIndex(i)
                }
                }
              >
                {
                  file.type === "IMAGE" ?
                    <img src={file.imgData as string} alt={file.file.name} className="w-full h-full object-cover" /> :
                    file.type === "VIDEO" ?
                      <video src={file.imgData as string} className="w-full h-full object-cover"></video> :
                      <img src={`../../../../images/file/${file.type}.png`} alt={file.type} className="w-8 h-10 mt-1.5 ml-2.5" />
                }

              </div>
              <div className="removeFileIcon hidden" onClick={() => handleRemoveFile(i)} >
                <CloseIcon className="dark:fill-white absolute top-0 right-0 w-4 h-4" />
              </div>
            </div>

          ))
        }
        {/* Add another file */}
        <Add setActiveIndex={setActiveIndex} />
      </div>
      {/* Send button */}
      <div className="bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer"
        onClick={sendMessageHandle}
      >

        {
          loading ?
            <Spinner size={25} /> :
            <SendIcon className="fill-white" />
        }
      </div>
    </div>
  )
}


type HandleAndSendWithContextProps = {
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  message: string
}
const HandleAndSendWithContext: React.FC<HandleAndSendWithContextProps> = (props) => (
  <SocketContext.Consumer>
    {(socket) => <HandleAndSend {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HandleAndSendWithContext