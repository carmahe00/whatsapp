import DownloadIcon from "../../../../svg/Download"


interface Props{
    file:any
    type:string
}
const FileOthers = ({file, type}:Props) => {
  return (
    <div className="bg-green_3 p-2" >
        <div className="flex justify-between gap-x-8">
            {/* File info */}

            <div className="flex items-center gap-2">
                <img src={`../../../../images/file/${type}.png`} alt={type} className="w-8 object-contain" />
                <div className="flex flex-col gap-2">
                    <h1>{file.file.original_filename}{file.file.public_id.split(".")[1]}</h1>
                    <span className="text-sm" >{type}.{file.bytes}B</span>
                </div>
            </div>

            {/* Download file */}
            <a href={file.file.secure_url} target="_blank" download>
                <DownloadIcon className="" />
            </a>
        </div>
    </div>
  )
}

export default FileOthers