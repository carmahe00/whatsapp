import { useAppDispatch, useAppSelector } from "../../../../app/store"
import { clearFiles, selectChat } from "../../../../features/chatSlice"
import { CloseIcon } from "../../../../svg"

interface Props {
    activeIndex:number
}
const Header = ({activeIndex}:Props) => {
    const dispatch = useAppDispatch()
    const { files } = useAppSelector(rootState => selectChat(rootState));
    const clearFilesHandler = () => {
        dispatch(clearFiles())
    }
    return (
        <div className="w-full ">
            {/*Container*/}
            <div className="w-full flex items-center justify-between">
                {/*Close icon / empty files*/}
                <div
                    className="translate-x-4 cursor-pointer"
                    onClick={clearFilesHandler}
                >
                    <CloseIcon className="dark:fill-dark_svg_1" />
                </div>
                {/* File Name */}
                <h1 className="dark:text-dark_text_1 text-[15px]" >{
                    files[activeIndex]?.file?.name
                }</h1>
                <span></span>
            </div>
        </div>
    )
}

export default Header