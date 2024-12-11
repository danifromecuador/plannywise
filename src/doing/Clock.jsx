import './Clock.css'
import Countdown, { zeroPad } from 'react-countdown'
import { useState, useRef } from 'react'
import { Store } from '../store/store.js'

export const Clock = () => {
  const store = Store()
  const text = store.language.current === "english" ? store.language.text().english : store.language.text().spanish
  const countdownRef = useRef(null)
  const audioStart = new Audio('/start.mp3')
  const audioAlarm = new Audio('/clock_alarm.mp3')
  const [textStartBtn, setTextStartBtn] = useState(text.doing.pomodoro.start)
  const [viewStartBtn, setViewStartBtn] = useState("")
  const [viewPauseBtn, setViewPauseBtn] = useState("hide")
  const [viewResetBtn, setViewResetBtn] = useState("hide")
  const [date] = useState(Date.now() + 900000)

  const rendered = ({ minutes, seconds, completed }) => {
    if (completed) {
      audioAlarm.play()
      handleResetClick(false)
    }
    return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
  }

  const handleStartClick = () => {
    if (countdownRef.current) countdownRef.current.getApi().start()
    setViewStartBtn("hide")
    setViewPauseBtn("")
    setViewResetBtn("")
    audioStart.play()
  }

  const handlePauseClick = () => {
    if (countdownRef.current) countdownRef.current.getApi().pause()
    setTextStartBtn(text.doing.pomodoro.continue)
    setViewStartBtn("")
    setViewPauseBtn("hide")
    audioStart.play()
  }

  const handleResetClick = (withSound) => {
    if (countdownRef.current) countdownRef.current.getApi().stop()
    setTextStartBtn(text.doing.pomodoro.start)
    setViewStartBtn("")
    setViewPauseBtn("hide")
    setViewResetBtn("hide")
    if (withSound) audioStart.play()
  }

  return (
    <div className="pomodoro sub-container">
      <div className="clock">
        <Countdown
          ref={countdownRef}
          date={date}
          autoStart={false}
          renderer={rendered}
        />
      </div>
      <div className="controls">
        <button className={`${viewStartBtn} start bigBtn`} onClick={handleStartClick}>{textStartBtn}</button>
        <button className={`${viewPauseBtn} pause bigBtn`} onClick={handlePauseClick}>{text.doing.pomodoro.pause}</button>
        <button className={`${viewResetBtn} reset bigBtn`} onClick={() => handleResetClick(true)}>{text.doing.pomodoro.reset}</button>
      </div>
    </div>
  )
}