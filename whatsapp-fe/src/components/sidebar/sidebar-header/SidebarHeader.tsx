import { useState } from "react";
import { useAppSelector } from "../../../app/store";
import { selectUser } from "../../../features/userSlice";
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from "../../../svg";
import Menu from "./Menu";
import { CreateGroup } from "./createGroup";

const SidebarHeader = () => {

    const [showMenu, setshowMenu] = useState(false)
    const [showCreateGroup, setShowCreateGroup] = useState(false)
    const user = useAppSelector(rootState => selectUser(rootState));
    return (
        <>
            {/*Sidebar Header */}
            <div className='h-[50px] dark:bg-dark_bg_2 flex items-center p16' >
                <div className="w-full flex items-center justify-between">
                    <button className="btn">
                        <img src={user.user.picture} alt={user.user.name} className="w-full h-full rounded-full object-cover" />
                    </button>
                    {/* user icons */}
                    <ul className="flex items-center gap-x-2 5">
                        <li>
                            <button className="btn">
                                <CommunityIcon className="dark:fill-dark_svg_1" />
                            </button>
                        </li>
                        <li>
                            <button className="btn">
                                <StoryIcon active={false} className="dark:fill-dark_svg_1" />
                            </button>
                        </li>
                        <li>
                            <button className="btn">
                                <ChatIcon className="dark:fill-dark_svg_1" />
                            </button>
                        </li>
                        <li className="relative" >
                            <button className={`btn ${showMenu ? "bg-dark_hover_1" : ""}`} onClick={() => setshowMenu(!showMenu)} >
                                <DotsIcon className="dark:fill-dark_svg_1" />
                            </button>
                            {
                                showMenu && <Menu setShowCreateGroup={setShowCreateGroup} />
                            }
                        </li>
                    </ul>
                </div>
            </div>
            {/* Create Group */}
            {
                showCreateGroup ?
                    <CreateGroup setShowCreateGroup={setShowCreateGroup} /> :
                    null
            }

        </>
    )
}

export default SidebarHeader