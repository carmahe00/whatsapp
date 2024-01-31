import { CloseIcon, EmojiIcon } from "../../../svg"
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react"
interface Props {
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  textRef: React.RefObject<HTMLInputElement>
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>
  showPicker:boolean
  setShowAttachments:React.Dispatch<React.SetStateAction<boolean>>
}

const EmojiPickerApp = ({ textRef, message, setMessage, setShowPicker, showPicker, setShowAttachments }: Props) => {
 

  const handleEmojiClick = (emojiData: EmojiClickData, event: globalThis.MouseEvent) => {
    const { emoji } = emojiData
    const ref = textRef.current
    if (ref) {
      ref?.focus()
      const start = message.substring(0, ref.selectionStart!) // Get position of cursor inside input
      const end = message.substring(ref.selectionStart!)
      const newText = start + emoji + end
      setMessage(newText)
    }
  }
  return (
    <li className="w-full" >
      <button className="btn" type="button"
        onClick={() => {
          setShowPicker(!showPicker)
          setShowAttachments(false)
        }}
      >
        {
          showPicker ? (
            <CloseIcon className="dark:fill-dark_svg_1" />
          ) : (
            <EmojiIcon className="dark:fill-dark_svg_1" />
          )
        }
      </button>

      {
        showPicker &&
        <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker onEmojiClick={handleEmojiClick} theme={Theme.DARK} />
        </div>
      }
    </li>
  )
}

export default EmojiPickerApp