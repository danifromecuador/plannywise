import { useState, useRef } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { Store } from '../store/store.js'
import './Clock.css'

export const Clock = () => {
  const store = Store()
  const text = store.configs.language.current === "english" ? store.configs.language.text().english : store.configs.language.text().spanish
  const countdownRef = useRef(null)
  const audioStart = new Audio('/start.mp3')
  const audioAlarm = new Audio('/clock_alarm.mp3')
  const [date] = useState(Date.now() + 900000)
  const [textStartBtn, setTextStartBtn] = useState(text.doing.pomodoro.start)
  const [viewStartBtn, setViewStartBtn] = useState("")
  const [viewPauseBtn, setViewPauseBtn] = useState("hide")
  const [viewResetBtn, setViewResetBtn] = useState("hide")

  const rendered = ({ minutes, seconds, completed }) => {
    completed && (audioAlarm.play(), handleResetClick(false))
    return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
  }

  const handleStartClick = () => {
    countdownRef.current && countdownRef.current.getApi().start()
    setViewStartBtn("hide")
    setViewPauseBtn("")
    setViewResetBtn("")
    audioStart.play()
  }

  const handlePauseClick = () => {
    countdownRef.current && countdownRef.current.getApi().pause()
    setTextStartBtn(text.doing.pomodoro.continue)
    setViewStartBtn("")
    setViewPauseBtn("hide")
    audioStart.play()
  }

  const handleResetClick = (withSound) => {
    countdownRef.current && countdownRef.current.getApi().stop()
    setTextStartBtn(text.doing.pomodoro.start)
    setViewStartBtn("")
    setViewPauseBtn("hide")
    setViewResetBtn("hide")
    // play a sound when reseting but just when user clicks on RESET btn
    withSound && audioStart.play()
  }

  return (
    <div className="pomodoro sub-container">
      <div className="clock"><Countdown ref={countdownRef} date={date} autoStart={false} renderer={rendered} /></div>
      <div className="controls">
        <button className={`${viewStartBtn} start bigBtn`} onClick={handleStartClick}>{textStartBtn}</button>
        <button className={`${viewPauseBtn} pause bigBtn`} onClick={handlePauseClick}>{text.doing.pomodoro.pause}</button>
        <button className={`${viewResetBtn} reset bigBtn`} onClick={() => handleResetClick(true)}>{text.doing.pomodoro.reset}</button>
      </div>
    </div>
  )
}