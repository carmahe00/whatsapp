import React, { useRef } from 'react'
import { PhotoIcon } from '../../../../../svg'
import { useAppDispatch } from '../../../../../app/store'
import { addFiles,  } from '../../../../../features/chatSlice'
import { getFileType } from '../../../../../utils/file'

const PhotoAttachment = () => {
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  
  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if (!e.target.files?.length)
      return
    let files = Array.from(e.target.files)
    files.forEach(file => {
      
      if (
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
      } else if (file.size > 1024 * 1024 * 40) {
        files = files.filter(item => item.name !== file.name)
        return
      }
      else {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {

          dispatch(addFiles({ 
            imgData: e.target?.result, 
            file, 
            type: getFileType(file.type)
          }))
        }
      }
    })

  }
  return (
    <li>
      <button type='button' className="bg-[#BF59CF] rounded-full" onClick={() => inputRef.current?.click()} >
        <PhotoIcon />
      </button>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        
        accept="image/png,image/jpeg,image/gif,image/webp,video/mp4,video/mpeg"
        onChange={imageHandler}
      />
    </li>
  )
}

export default PhotoAttachment