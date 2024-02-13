interface Props {
  secureUrl: string
  type: string
}
const FileImageVideo = ({ secureUrl, type }: Props) => {
  return (
    <div>{
      type === "IMAGE" ?
        <img src={secureUrl} alt='whatsapp' className="cursor-pointer" /> :
        <video src={secureUrl} className="cursor-pointer"></video>
    }
    </div>
  )
}

export default FileImageVideo