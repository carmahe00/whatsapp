import { useState } from "react"
import { ReturnIcon } from "../../../../svg"
import UnderlineInput from "./UnderlineInput"
import MultipleSelect from "./MultipleSelect"
import { useAppDispatch, useAppSelector } from "../../../../app/store"
import { selectUser } from "../../../../features/userSlice"
import { createGroupConversation, selectChat } from "../../../../features/chatSlice"
import { MultiValue } from "react-select"
import axios, { AxiosError } from "axios"
import Spinner from "../../../utils/Spinner"
import ValidIcon from "../../../../svg/Valid"


export interface SelectInterface {
    value: string,
    label: string,
    picture: string

}
interface Props {
    setShowCreateGroup: React.Dispatch<React.SetStateAction<boolean>>
}
const CreateGroup = ({ setShowCreateGroup }: Props) => {
    const dispatch = useAppDispatch()
    const [name, setName] = useState<string>("")
    const [selectedUser, setSelectedUser] = useState<MultiValue<SelectInterface>>([])
    const [searchResult, setSearchResult] = useState<SelectInterface[]>([])
    const { user } = useAppSelector(rootState => selectUser(rootState));
    const { status } = useAppSelector(rootState => selectChat(rootState));
    const handleSearch = async (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.currentTarget.querySelector("input")?.value && e.key === "Enter") {
            setSearchResult([])
            try {
                const { data } = await axios.get<[]>(
                    `${process.env.REACT_APP_API_ENDPOINT}/user?search=${e.currentTarget.querySelector("input")?.value}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.acces_token}`
                        }
                    }
                )
                if (data.length > 0) {
                    let tempArray: SelectInterface[] = []
                    data.forEach((user: any) => {
                        let temp = {
                            value: user._id,
                            label: user.name,
                            picture: user.picture
                        }
                        tempArray.push(temp)
                    })
                    setSearchResult(tempArray)
                } else {
                    setSearchResult([])
                }
            } catch (error) {
                const err = error as AxiosError<any>
                if (err.response && typeof err.response.data.error.message)
                    console.log(err.response.data.error.message as string)
                else if (err.response)
                    console.log(err.response.data.error)
            }
        } else {
            setSearchResult([])
        }
    }
    const createGroupHandler = async() =>{
        if(status !== "loading"){
            let users:string[] = []
            selectedUser.forEach(user =>{
                users.push(user.value)
            })
            let values = {
                name,
                users,
                acces_token: user.acces_token
            }
            let newConvo = await dispatch(createGroupConversation(values))
            setShowCreateGroup(false)
        }
    }
    return (
        <div className="createGroupAnimation relative flex0030 h-full z-40" >
            {/* Container */}
            <div className="mt-5">
                {/* Return/close button */}
                <button className="btn h-6 w-6 border"
                    onClick={() => setShowCreateGroup(false)}
                >
                    <ReturnIcon className="fill-white" />
                </button>
                {/* Group name input */}
                <UnderlineInput name={name} setName={setName} />
                {/* Multiple select */}
                <MultipleSelect
                    selectedUser={selectedUser}
                    searchResult={searchResult}
                    setSelectedUser={setSelectedUser}
                    handleSearch={handleSearch}
                />
                {/* Create group button */}
                <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 ">
                    <button className="btn bg-green_1 scale-150 hover:bg-green-500"
                        onClick={createGroupHandler}
                    >
                        {
                            status === "loading" ?
                                <Spinner /> :
                                <ValidIcon className="fill-white mt-2 h-full" />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateGroup