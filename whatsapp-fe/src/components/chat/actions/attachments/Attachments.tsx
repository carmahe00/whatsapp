import { AttachmentIcon } from "../../../../svg"
import Menu from "./menu/Menu"
interface Props {
  showAttachments: boolean
  setShowAttachments: React.Dispatch<React.SetStateAction<boolean>>
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>
}
const Attachments = ({ setShowAttachments, showAttachments, setShowPicker }:Props) => {
  
  return (
    <li className="relative" >
        <button onClick={() => {
          setShowAttachments(!showAttachments)
          setShowPicker(false)
          }} className="btn">
            <AttachmentIcon className="dark:fill-dark_svg_1" />
        </button>
        {/* Menu */}
        {
          showAttachments && <Menu />
        }
    </li>
  )
}

export default Attachments