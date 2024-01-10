import React, { useState } from 'react'
import { SidebarHeader } from './sidebar-header'
import { Notifications } from './notifications'
import { Search, SearchResults } from './search'
import { Conversations } from '../conversations'
import { User } from '../../common/common.inteface'

const Sidebar = () => {
    const [searchResult, setsearchResult] = useState<User[]>([])
    return (
        <div className='w-[40%] h-full select-none ' >
            {/* Sidebar Header */}
            <SidebarHeader />
            {/* Notification */}
            <Notifications />
            {/* Search */}
            <Search searchLength={searchResult.length} setsearchResult={setsearchResult} />


            {searchResult.length > 0 ?
                <SearchResults searchResult={searchResult}/> :
                <Conversations />
            }
        </div>
    )
}

export default Sidebar