import React from 'react'
import { useAppSelector } from '../../app/store'
import { selectChat } from '../../features/chatSlice'
import Conversation from './Conversation'


const Conversations = () => {
    const { conversations } = useAppSelector(selectChat)
  return (
    <div className="convos scrollbar">
        <ul>

        {
            conversations.length && conversations.map((convo, i)=>
            <Conversation convo={convo} key={i} />
            )
        }
        </ul>
    </div>
  )
}

export default Conversations