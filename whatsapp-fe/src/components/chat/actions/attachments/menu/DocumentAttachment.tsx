import { useRef } from "react"
import { DocumentIcon } from "../../../../../svg"
import { useAppDispatch } from "../../../../../app/store"
import { addFiles } from "../../../../../features/chatSlice"
import { getFileType } from "../../../../../utils/file"


const DocumentAttachment = () => {
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const documentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length)
      return
    let files = Array.from(e.target.files)
    files.forEach(file => {
      if (
        file.type !== "application/pdf" &&
        file.type !== "text/plain" &&
        file.type !== "application/msword" &&
        file.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        file.type !== "application/vnd.ms-powerpoint" &&
        file.type !==
        "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
        file.type !== "application/vnd.ms-excel" &&
        file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        file.type !== "application/vnd.rar" &&
        file.type !== "application/zip" &&
        file.type !== "audio/mpeg" &&
        file.type !== "audio/wav"
      ) {
        files = files.filter((item) => item.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 10) {
        files = files.filter(item => item.name !== file.name)
        return
      }
      else {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {

          dispatch(addFiles({ file, type: getFileType(file.type) }))
        }
      }
    })

  }
  return (
    <li>
      <button type='button' className="bg-[#5F66CD] rounded-full" onClick={() => inputRef.current?.click()} >
        <DocumentIcon />
      </button>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="application/*,text/plain"
        onChange={documentHandler}
      />
    </li>
  )
}

export default DocumentAttachment