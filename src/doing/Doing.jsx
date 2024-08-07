import { useState } from 'react'
import './Doing.css'

export const Doing = () => {
  const [viewStartBtn, setViewStartBtn] = useState("")
  const [viewPauseBtn, setViewPauseBtn] = useState("hide")

  const handleClickStartBtn = () => {
    setViewStartBtn("hide")
    setViewPauseBtn("")
  }

  const handleClickPauseBtn = () => {
    setViewStartBtn("")
    setViewPauseBtn("hide")
  }

  const handleClickResetBtn = () => {
    setViewStartBtn("")
    setViewPauseBtn("hide")
  }

  return (
    <div className='Doing'>
      <h1>Doing</h1>      
      <div className="pomodoro">
        <div className="clock">15:00</div>
        <div className="controls">
          <button
            className={`${viewStartBtn} start`}
            onClick={() => handleClickStartBtn()}
          >START</button>
          <button
            className={`${viewPauseBtn} pause`}
            onClick={() => handleClickPauseBtn()}
          >PAUSE</button>
          <button
            className="reset"
          onClick={() => handleClickResetBtn()}
          >RESET</button>
      </div>
      <div className="motivational">
        <p>You only fall when you stop trying!</p>
      </div>
    </div>

    </div >
  )
}