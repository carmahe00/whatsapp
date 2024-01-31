import React, { useState } from 'react'
import { SidebarHeader } from './sidebar-header'
import { Notifications } from './notifications'
import { Search, SearchResults } from './search'
import { Conversations } from './conversations'
import { User } from '../../common/common.inteface'
interface Props {
    onlineUsers: {
        socketId: string;
        userId: string;
    }[]
    typing?:string
}
const Sidebar = ({ onlineUsers, typing }:Props) => {
    const [searchResult, setsearchResult] = useState<User[]>([])
    return (
        <div className='flex0030 max-w-[30%] h-full select-none ' >
            {/* Sidebar Header */}
            <SidebarHeader />
            {/* Notification */}
            <Notifications />
            {/* Search */}
            <Search searchLength={searchResult.length} setsearchResult={setsearchResult} />


            {searchResult.length > 0 ?
                <SearchResults searchResult={searchResult} setsearchResult={setsearchResult} /> :
                <Conversations  onlineUsers={onlineUsers} typing={typing} />
            }
        </div>
    )
}

export default Sidebar