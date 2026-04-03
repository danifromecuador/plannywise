import { useRef, useState } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import { Store } from '../store/store.js'
import { selectLocalizedUiText } from '../store/language.js'
import './Clock.css'

export const Clock = () => {
  const text = Store(selectLocalizedUiText)
  const countdownRef = useRef(null)
  const audioStartRef = useRef(new Audio('/start.mp3'))
  const audioAlarmRef = useRef(new Audio('/clock_alarm.mp3'))
  const [date] = useState(Date.now() + 900000)
  const [textStartBtn, setTextStartBtn] = useState(text.doing.pomodoro.start)
  const [viewStartBtn, setViewStartBtn] = useState("")
  const [viewPauseBtn, setViewPauseBtn] = useState("hide")
  const [viewResetBtn, setViewResetBtn] = useState("hide")
  const countdownApi = () => countdownRef.current?.getApi()

  const playStartSound = () => {
    audioStartRef.current.play()
  }

  const rendered = ({ minutes, seconds, completed }) => {
    if (completed) {
      audioAlarmRef.current.play()
      handleResetClick(false)
    }
    return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
  }

  const handleStartClick = () => {
    countdownApi()?.start()
    setViewStartBtn("hide")
    setViewPauseBtn("")
    setViewResetBtn("")
    playStartSound()
  }

  const handlePauseClick = () => {
    countdownApi()?.pause()
    setTextStartBtn(text.doing.pomodoro.continue)
    setViewStartBtn("")
    setViewPauseBtn("hide")
    playStartSound()
  }

  const handleResetClick = (withSound) => {
    countdownApi()?.stop()
    setTextStartBtn(text.doing.pomodoro.start)
    setViewStartBtn("")
    setViewPauseBtn("hide")
    setViewResetBtn("hide")
    // play a sound when reseting but just when user clicks on RESET btn
    if (withSound) playStartSound()
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