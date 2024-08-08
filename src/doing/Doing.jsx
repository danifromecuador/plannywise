import { useState, useRef } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import './Doing.css'

export const Doing = () => {
  const [textStartBtn, setTextStartBtn] = useState("START")
  const [viewStartBtn, setViewStartBtn] = useState("")
  const [viewPauseBtn, setViewPauseBtn] = useState("hide")
  const [viewResetBtn, setViewResetBtn] = useState("hide")
  const [date, setDate] = useState(Date.now() + 900000)
  const countdownRef = useRef(null)

  const handleStartClick = () => {
    if (countdownRef.current) countdownRef.current.getApi().start()
    setViewStartBtn("hide")
    setViewPauseBtn("")
    setViewResetBtn("")
  }

  const handlePauseClick = () => {
    if (countdownRef.current) countdownRef.current.getApi().pause()
    setTextStartBtn("CONTINUE")
    setViewStartBtn("")
    setViewPauseBtn("hide")
  }

  const handleResetClick = () => {
    setDate(Date.now() + 900000)
    setTextStartBtn("START")
    setViewStartBtn("")
    setViewPauseBtn("hide")
    setViewResetBtn("hide")
  }

  const rendered = ({ minutes, seconds }) => <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>

  return (
    <div className='Doing'>
      <h1>Doing</h1>
      <div className="pomodoro">
        <div className="clock">
          <Countdown
            ref={countdownRef}
            date={date}
            autoStart={false}
            renderer={rendered}
          />
        </div>
        <div className="controls">
          <button className={`${viewStartBtn} start`} onClick={handleStartClick}>{textStartBtn}</button>
          <button className={`${viewPauseBtn} pause`} onClick={handlePauseClick}>PAUSE</button>
          <button className={`${viewResetBtn} reset`} onClick={handleResetClick}>RESET</button>
        </div>
        <div className="motivational">
          <p>You only fall when you stop trying!</p>
        </div>
      </div>
    </div >
  )
}

