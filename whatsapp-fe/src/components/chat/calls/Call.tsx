
import React, { useState } from 'react';
import CallActions from './CallActions';
import CallArea from './CallArea';
import Header from './Header';
import Rining from './Rining'
import { CallProps } from '../../../pages/home';

interface Props {
  call: CallProps,
  setCall: React.Dispatch<React.SetStateAction<CallProps>>
  callAccepted: boolean
  myVideo: React.RefObject<HTMLVideoElement>
  userVideo: React.RefObject<HTMLVideoElement>
  stream: MediaStream
  answerCall: () => void
  endCall: () => void
  totalSecInCall: number
  setTotalSecInCall: React.Dispatch<React.SetStateAction<number>>
}
const Call = React.memo(function ({ call, setCall, callAccepted, myVideo, userVideo, answerCall, stream, endCall, totalSecInCall, setTotalSecInCall }: Props) {
  const { callEnded, receiveingCall, name } = call
  const [showActions, setshowActions] = useState(false)
  const [toggle, setToggle] = useState<boolean>()
  return (
    <>
      <div
        className={`
      fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg
      ${receiveingCall && !callAccepted ? "hidden" : ""}
      `}
        onMouseOver={() => setshowActions(true)}
        onMouseOut={() => setshowActions(false)}
      >
        {/* Container */}
        <div className="">
          <div className="">
            {/* Header */}
            <Header />
            {/* Call area */}
            <CallArea callAccepted={callAccepted} name={name} totalSecInCall={totalSecInCall} setTotalSecInCall={setTotalSecInCall} />
            {/* Call Actions */}
            {
              showActions ? <CallActions endCall={endCall} /> : null
            }
          </div>
          {/* Video Streams */}
          <div className="">
            {/* User video */}
            {
              callAccepted && !callEnded ?
                <div>
                  <video
                    ref={userVideo}
                    playsInline
                    muted
                    autoPlay
                    className={toggle ? "SmallVideoCall" : "largeVideoCall"}
                    onClick={() => setToggle(!toggle)}
                  ></video>
                </div> :
                null
            }
            {/* My video */}
            {
              stream ?
                <div>
                  <video
                    ref={myVideo}
                    playsInline
                    muted
                    autoPlay
                    className={`${toggle ? "largeVideoCall" : "SmallVideoCall"} ${showActions ? 'moveVideoCall' : ''}`}
                    onClick={() => setToggle(!toggle)}
                  ></video>
                </div> :
                null
            }
          </div>
        </div>

      </div>
      {/* Ringing */}
      {
        receiveingCall && !callAccepted && (
          <Rining endCall={endCall} call={call} setCall={setCall} answerCall={answerCall} />
        )
      }
    </>
  )
})

export default Call