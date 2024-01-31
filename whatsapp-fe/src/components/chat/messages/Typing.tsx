

import TraingleIcon from "../../../svg/Triangle"
import Dots from "../../utils/Dots"
const Typing = () => {
    return (
        <div
            className={`w-full flex mt-2 space-x-3 max-w-xs`}
        >
            {/*Message Container*/}
            <div className="relative">

                <div
                    className={`relative h-full dark:text-dark_text_1 rounded-lg dark:bg-dark_bg_2`}
                >
                    {/*Message*/}
                    <p className="float-left h-full ">
                        <Dots />
                    </p>
                    {/*Traingle*/}

                    <span>
                        <TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Typing