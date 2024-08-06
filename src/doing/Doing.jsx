import { useState, useRef, useEffect } from 'react'
import './Doing.css'

export const Doing = () => {
  // const [startBtnView, setStartBtnView] = useState("")
  // const [pauseBtnView, setPauseBtnView] = useState("hide")

  // const handleStartBtnClick = () => { setStartBtnView("hide"); setPauseBtnView(""); onClickReset() }
  // const handlePauseBtnClick = () => { setStartBtnView(""); setPauseBtnView("hide") }



  const Ref = useRef(null)
  const [timer, setTimer] = useState("00:00:00")

  const getTimeRemaining = e => {
    const total = Date.parse(e) - Date.parse(new Date())
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / 1000 / 60 / 60) % 24)
    return { total, hours, minutes, seconds }
  }

  const startTimer = e => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e)
    if (total >= 0) setTimer((hours > 9 ? hours : "0" + hours)) + ":" + (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds)
  }

  const clearTimer = e => {
    setTimer("00:00:10")
    if (Ref.current) clearInterval(Ref.current)
    const id = setInterval(() => {
      startTimer(e)
    }, 1000)
    Ref.current = id
  }

  const getDeadTime = () => {
    let deadline = new Date()
    deadline.setSeconds(deadline.getSeconds() + 10)
    return deadline
  }

  useEffect(() => { clearTimer(getDeadTime()) }, [])

  const onClickReset = () => clearTimer(getDeadTime())
  console.log(timer);

  return (
    <div className='Doing'>
      <div className="clock-container">
        <div className="time">
          {timer}
        </div>
        <button onClick={onClickReset}>START</button>
        {/* <button className={`${pauseBtnView} pause`} onClick={onClickReset}>PAUSE</button> */}
      </div>
    </div>
  )
}