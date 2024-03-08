
interface Props{
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
}
const Underlineinput = ({name, setName}:Props) => {
  return (
    <div className="mt-4" >
        <input 
        type="text" 
        value={name} 
        onChange={e => setName(e.currentTarget.value)} 
        className="w-full bg-transparent border-b border-green_1 dark:text-dark_text_1 outline-1 pl-1"
        />
    </div>
  )
}

export default Underlineinput