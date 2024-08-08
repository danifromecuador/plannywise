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
    if (countdownRef.current) countdownRef.current.getApi().stop()
    setTextStartBtn("START")
    setViewStartBtn("")
    setViewPauseBtn("hide")
    setViewResetBtn("hide")
  }

  const rendered = ({ minutes, seconds }) => <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios('https://api.quotable.io/quotes/random?maxLength=50')
        const data = response.data[0]
        setQuote(data.content)
        setAuthor(data.author)
      }
      catch (error) { console.error('Error fetching the quote', error) }
    }
    fetchQuote()
  }, [fetchNewQuote])

  const catchNewQuote = () => fetchNewQuote == "yes" ? setFetchNewQoute("") : setFetchNewQoute("yes")

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
          <span>{quote}</span>{` -- `}
          <span>{author}</span>{` `}
          <span onClick={catchNewQuote}>🗘</span>
        </div>
      </div>
    </div >
  )
}