import React, { useEffect,  useState } from 'react'
import { CloseIcon } from '../../../svg'
import ValidIcon from '../../../svg/Valid'
import { CallProps } from '../../../pages/home'

interface Props {
  call: CallProps,
  setCall: React.Dispatch<React.SetStateAction<CallProps>>
  answerCall:() => void
  endCall: () => void
}
const Rining = ({setCall, call, answerCall, endCall}: Props) => {
  const {  name, picture } = call
  const [timer, setTimer] = useState(0);
  let timerRef:NodeJS.Timer | undefined; // Specify the type explicitly
  
  const handleTimer = () => {
    timerRef = setInterval(() => {
      setTimer(prev => prev + 1); // Increment the timer correctly
    }, 1000);
  };
  useEffect(() => {
    if (timer < 30) {
      handleTimer();
    } else {
      setCall({...call, receiveingCall:false})
    }
    return () => {
      clearInterval(timerRef)
    }
  }, [timer]);


  return (
    <div className='dark:bg-dark_bg_1 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-30' >
      <div className="p-4 flex items-center justify-center gap-x-8">
        {/* call infos */}
        <div className="flex items-center gap-x-2">
          <img src={picture} alt="caller profile" className="w-28 h-28 rounded-full" />

          <div>
            <h1 className="dark:text-white">
              <b>{name}</b>
            </h1>
            <span className="dark:text-dark_text_2">Whatsapp video...</span>
          </div>
        </div>

        {/* call actions */}
        <ul className="flex items-center gap-x-2">
          <li onClick={endCall}>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
              <CloseIcon className="fill-white w-5" />
            </button>
          </li>
          <li onClick={answerCall} >
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
              <ValidIcon className="fill-white w-6 mt-2" />
            </button>
          </li>
        </ul>
      </div>
      {/* RingTone */}
      <audio src="../../../../audio/ringtone.mp3" loop autoPlay ></audio>

    </div>
  )
}

export default Rining