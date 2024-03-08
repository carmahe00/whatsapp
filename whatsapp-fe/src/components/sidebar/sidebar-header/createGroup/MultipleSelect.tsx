import Select, { MultiValue } from 'react-select'
import { SelectInterface } from './CreateGroup'


interface PropsComponenet {
    selectedUser: MultiValue<SelectInterface>
    searchResult: SelectInterface[]
    setSelectedUser: React.Dispatch<React.SetStateAction<MultiValue<SelectInterface>>>
    handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>
}
interface GroupBase<Option> {
    readonly options: readonly Option[];
    readonly label?: string;
    picture: string
}
const MultipleSelect = ({ selectedUser, searchResult, handleSearch, setSelectedUser }: PropsComponenet) => {
    return (
        <div className='mt-4' >

            <Select
                options={searchResult}
                onChange={setSelectedUser}
                onKeyDown={handleSearch}
                isMulti
                placeholder="Search, select users"
                formatOptionLabel={(userFouinded) => (
                    <div className='flex items-center gap-1' >
                        <img src={userFouinded.picture} alt='' className='w-8 h-8 object-cover rounded-full'/>
                        <span className='text-[#222]' >{userFouinded.label}</span>
                    </div>
                )}
                styles={{
                    control: (base, props) => ({
                        ...base,
                        border: "none",
                        borderColor: "transparent",
                        background: "transparent"
                    })
                }}
            />
        </div>
    )
}

export default MultipleSelect