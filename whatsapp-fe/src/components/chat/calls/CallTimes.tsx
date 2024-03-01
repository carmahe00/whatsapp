import { useEffect } from "react"
import { Observable } from "rxjs";

interface Props {
    totalSecInCall: number,
    setTotalSecInCall: React.Dispatch<React.SetStateAction<number>>
    callAccepted: boolean
}

const CallTimes = ({ setTotalSecInCall, totalSecInCall, callAccepted }: Props) => {
    useEffect(() => {
        if (!callAccepted) return;

        let interval: NodeJS.Timer
        const observable = new Observable<number>(subscriber => {
            // Async operation
            interval = setInterval(() => {
                subscriber.next(totalSecInCall + 1);
            }, 1000);
        });

        // Subscribe to updates
        const subscription = observable.subscribe(second => setTotalSecInCall(prev => second+prev));

        return () => {
            // Clean up subscription 
            subscription.unsubscribe();
            clearInterval(interval)
            setTotalSecInCall(0)
        };
    }, [callAccepted]);

    return (
        <div className={`text-dark_bg_2 ${totalSecInCall !== 0 ? "block" : "hidden"}`} >
            
            {
                totalSecInCall / 3600 >= 0 ?
                    <>
                        <span>
                            {
                                parseInt((totalSecInCall / 3600).toString()).toString().length < 2 ?
                                    "0" + parseInt((totalSecInCall / 3600).toString()) :
                                    parseInt((totalSecInCall / 3600).toString())
                            }
                        </span>
                        <span>:</span>
                    </> : null
            }
            <span>
                {
                    parseInt((totalSecInCall / 60).toString()).toString().length < 2 ?
                        "0" + parseInt((totalSecInCall / 60).toString()) :
                        parseInt((totalSecInCall / 60).toString())
                }
            </span>
            <span>:</span>
            <span>
                {
                    (totalSecInCall % 60).toString().length < 2 ?
                        "0" + totalSecInCall % 60 :
                        totalSecInCall % 60
                }
            </span>
        </div>
    )
}

export default CallTimes