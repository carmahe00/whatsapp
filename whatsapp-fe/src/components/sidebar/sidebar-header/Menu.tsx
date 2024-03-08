import { useAppDispatch } from "../../../app/store"
import { logout } from "../../../features/userSlice"

interface Props {
    setShowCreateGroup: React.Dispatch<React.SetStateAction<boolean>>
}
const Menu = ({setShowCreateGroup}:Props) => {
    const dispatch = useAppDispatch()
    
    return (
        <div className='absolute right-1 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52' >
            <ul>
                <li className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3'
                    onClick={() => setShowCreateGroup(true)}
                >
                    <span>New Group</span>
                </li>
                <li className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3' >
                    <span>New Comunity</span>
                </li>
                <li className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3' >
                    <span>Starred messaged</span>
                </li>
                <li className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3' >
                    <span>Settings</span>
                </li>
                <li 
                className='py-3 pl-5 cursor-pointer hover:bg-dark_bg_3' 
                onClick={() => dispatch(logout())}
                >
                    <span>Logout</span>
                </li>
            </ul>
        </div>
    )
}

export default Menu