import React, { useRef } from 'react'
import { CloseIcon } from '../../../../svg'
import { useAppDispatch } from '../../../../app/store'
import { addFiles } from '../../../../features/chatSlice'
import { getFileType } from '../../../../utils/file'
interface Props {
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>
}
const Add = ({ setActiveIndex }: Props) => {
    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null)
    const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                file.type !== "audio/wav" &&
                file.type !== "image/png" &&
                file.type !== "image/jpeg" &&
                file.type !== "image/gif" &&
                file.type !== "image/webp" &&
                file.type !== "video/mp4" &&
                file.type !== "video/mpeg" &&
                file.type !== "image/webm" &&
                file.type !== "image/webp"
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

                    dispatch(addFiles({
                        file,
                        type: getFileType(file.type),
                        imgData: getFileType(file.type) === "IMAGE" ? e.target?.result : null,
                    }
                    ))
                }
            }
        })
    }
    return (
        <div
            onClick={() => inputRef.current?.click()}
            className='w-14 h-14 mt-2 border dark:border-white rounded-md flex items-center justify-center cursor-pointer' >
            <span className='rotate-45' >
                <CloseIcon className="dark:fill-dark_svg_1" />
            </span>
            <input
                type="file"
                hidden
                multiple
                ref={inputRef}
                accept="application/*,text/plain,image/png,image/jpeg,image/gif,image/webp,video/mp4,video/mpeg"
                onChange={fileHandler}
            />
        </div>
    )
}

export default Add