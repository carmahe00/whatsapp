
interface Props {
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}
const Input = ({ message, setMessage }: Props) => {
  return (
    <div className="w-full max-w-[60%] dark:bg-dark_hover_1 rounded-lg">
      {/* Input */}
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="w-full bg-transparent h-11 pl-2 focus:outline-none border-none dark:text-dark_text_1"
      />
    </div>
  )
}

export default Input