import { useEffect, useState, useRef } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import axios from 'axios'
import { Footer } from './Footer.jsx'
import { Store } from '../store/store.js'
import './Doing.css'

export const Doing = () => {
  const store = Store()
  const text = store.language.current === "english" ? store.language.text().english : store.language.text().spanish
  const [textStartBtn, setTextStartBtn] = useState(text.doing.pomodoro.start)
  const [viewStartBtn, setViewStartBtn] = useState("")
  const [viewPauseBtn, setViewPauseBtn] = useState("hide")
  const [viewResetBtn, setViewResetBtn] = useState("hide")
  const [date] = useState(Date.now() + 900000)
  const countdownRef = useRef(null)
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [fetchNewQuote, setFetchNewQoute] = useState("")
  const audioStart = new Audio('/start.mp3')
  const audioAlarm = new Audio('/clock_alarm.mp3')
  const catchNewQuote = () => fetchNewQuote == "yes" ? setFetchNewQoute("") : setFetchNewQoute("yes")

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

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios('https://api.quotable.io/random', {
          params: {
            tags: 'motivational|success|change|character|future|inspirational',
            maxLength: 70,
          }
        })
        setQuote(response.data.content.slice(0, -1)) // Delete the last dot of the quote
        setAuthor(response.data.author)
      }
      catch (error) { console.error(text.doing.coute.error, error) }
    }
    fetchQuote()
  }, [fetchNewQuote])

  return (
    <div className='Doing'>
      <h1>{text.doing.title}</h1>
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
        <div className="motivational" onClick={catchNewQuote}>
          <p>{quote}</p>
          <p>{author}</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}