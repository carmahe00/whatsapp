import React from 'react'
import { capitalize } from '../../../utils/string'
import CallTimes from './CallTimes'
interface Props {
    name:string
    totalSecInCall:number
    setTotalSecInCall: React.Dispatch<React.SetStateAction<number>>
    callAccepted: boolean
}
const CallArea = ({name, totalSecInCall, setTotalSecInCall, callAccepted}:Props) => {
  return (
    <div
        className='absolute top-12 z-40 w-full p-1'
    >
        {/* Conatiner */}
        <div className="flex flex-col item-center">
            {/* Call infos */}
            <div className="flex flex-col items-center gap-y-1">
                <h1 className='text-white text-lg' >
                    <b>{name ? capitalize(name) : ""}</b>
                </h1>
                {
                    totalSecInCall === 0 ?
                    <span className='text-dark_text_1' >Ringing...</span> :
                    null
                }
                <CallTimes
                    setTotalSecInCall={setTotalSecInCall}
                    totalSecInCall={totalSecInCall}
                    callAccepted={callAccepted}
                />
            </div>
        </div>
    </div>
  )
}

export default CallArea