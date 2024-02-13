import { useAppSelector } from "../../../../app/store";
import { selectChat } from "../../../../features/chatSlice";

interface Props {
  activeIndex:number
}
const FileViewer = ({activeIndex}:Props) => {
  const { files } = useAppSelector(rootState => selectChat(rootState));
  return (
    <>
    {files[activeIndex] && 
      <div className="w-full max-w-[60%]" >
      <div className="flex justify-center items-center">
        {
          files[activeIndex].type === "IMAGE" ?
          <img src={files[activeIndex].imgData as string} alt={files[activeIndex].file.name}  className="max-w-[80%] object-contain hview" /> : 
          files[activeIndex].type === "VIDEO" ?
          <video src={files[activeIndex].imgData as string} controls className="max-w-[80%] object-contain hview" ></video> :
          <div className="min-w-full hview flex flex-col items-center justify-center py-2">
            {/* File Icon and Image */}
            <img src={`../../../../images/file/${files[activeIndex].type}.png`} alt={files[activeIndex].type} />
            <h1 className="dark:text-dark_text_2 text-2xl" >
              No preview available
            </h1>
            {/* file size */}
            <span className="dark:text-dark_text_2" >
              {files[activeIndex].file.size} KB - {files[activeIndex].type}
            </span>
          </div>
        }
      </div>
    </div>
    }
    </>
    
  )
}

export default FileViewer