
import { User } from '../../../common/common.inteface'
import Contact from './Contact'
interface Props {
    searchResult: User[]
    setsearchResult:React.Dispatch<React.SetStateAction<User[]>>
}
const SearchResults = ({ searchResult, setsearchResult }: Props) => {
    return (
        <div className='w-full convos scrollbar' >
            <div className="">
                <div className="flex flex-col px-8 pt-8">
                    <h1 className='font-extralight text-md text-green_2' >Contacts</h1>
                    <span className='w-full mt-4 ml-10 border-b dark:border-b-dark_border_1' ></span>
                </div>
                <ul>
                    {
                        searchResult && searchResult.map((user, i) =><Contact contact={user} key={i} setsearchResult={setsearchResult} />)
                    }
                </ul>
            </div>

        </div>
    )
}

export default SearchResults