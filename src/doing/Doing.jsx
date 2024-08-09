import { useEffect, useState, useRef } from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import axios from 'axios'
import './Doing.css'

export const Doing = () => {
  const [textStartBtn, setTextStartBtn] = useState("START")
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
    setTextStartBtn("CONTINUE")
    setViewStartBtn("")
    setViewPauseBtn("hide")
    audioStart.play()
  }

  const handleResetClick = (withSound) => {
    if (countdownRef.current) countdownRef.current.getApi().stop()
    setTextStartBtn("START")
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
      catch (error) { console.error('Error fetching the quote', error) }
    }
    fetchQuote()
  }, [fetchNewQuote])

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
          <button className={`${viewResetBtn} reset`} onClick={() => handleResetClick(true)}>RESET</button>
        </div>
        <div className="motivational" onClick={catchNewQuote}>
          <p>{quote}</p>
          <p>{author}</p>
        </div>
      </div>
    </div>
  )
}