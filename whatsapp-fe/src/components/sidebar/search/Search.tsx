import React, { KeyboardEvent, useState } from 'react'
import { FilterIcon, ReturnIcon, SearchIcon } from '../../../svg'
import axios, { AxiosError } from 'axios'
import { selectUser } from '../../../features/userSlice'
import { useAppSelector } from '../../../app/store'
import { useDebounce } from '../../../hooks/debounce-hook'
import { User } from '../../../common/common.inteface'
interface Props {
    searchLength: number
    setsearchResult: React.Dispatch<React.SetStateAction<User[]>>
}
const Search = ({ searchLength, setsearchResult }: Props) => {
    const [show, setshow] = useState(false)
    const user = useAppSelector(rootState => selectUser(rootState));

    const handleSearch = async (e: KeyboardEvent<HTMLInputElement>) => {
        const USER_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/user`;
        
        // Add a null check for e.currentTarget
        if ((e.target as HTMLInputElement).value.length > 3 && (e.target as HTMLInputElement).value) {
            try {
                const { data } = await axios.get(`${USER_ENDPOINT}?search=${(e.target as HTMLInputElement).value}`, {
                    headers: {
                        Authorization: `Bearer ${user.user.acces_token}`,
                    },
                });
                setsearchResult(data);
            } catch (error) {
                const err = error as AxiosError<any>;
                if (err.response && typeof err.response.data.error.message)
                    console.log(err.response.data.error.message);
            }

        } else {
            setsearchResult([]);
        }
    };  

    const debouncedHelloWorld = useDebounce(handleSearch, 2000);

    return (
        <div className='h-[49px] py-1.5 ' >
            <div className='px-[10px]' >
                {/* Search input container */}
                <div className="flex items-center gap-x-2">
                    <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2 ">
                        {show || searchLength > 0 ?
                            <span className='w-8 flex items-center justify-center rotateAnimation cursor-pointer'
                                onClick={() => setsearchResult([])}
                            >
                                <ReturnIcon className="fill-green_1 w-5" />
                            </span> :
                            <span className='w-8 flex items-center justify-center ' >
                                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
                            </span>
                        }
                        <input
                            type="text"
                            placeholder='Search or start a new chat'
                            className='input'
                            onFocus={() => setshow(true)}
                            onBlur={() => setshow(false)}
                            onKeyDown={debouncedHelloWorld}
                        />
                    </div>
                    <button className="btn">
                        <FilterIcon className="dark:fill-dark_svg_2" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Search