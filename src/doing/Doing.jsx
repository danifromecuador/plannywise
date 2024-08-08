import React, { useState, useRef } from 'react'
import Countdown from 'react-countdown'

export const Doing = () => {
  const [date, setDate] = useState(Date.now() + 61000)
  const countdownRef = useRef(null)

  const handleStartClick = () => { if (countdownRef.current) countdownRef.current.getApi().start() }
  const handlePauseClick = () => { if (countdownRef.current) countdownRef.current.getApi().pause() }
  const handleResetClick = () => setDate(Date.now() + 61000)

  return (
    <>
      <h3>Countdown with Start, Pause and Reset Controls</h3>
      <Countdown
        key={date}
        ref={countdownRef}
        date={date}
        autoStart={false}
      />
      <div>
        <button type="button" onClick={handleStartClick}>Start</button>
        <button type="button" onClick={handlePauseClick}>Pause</button>
        <button type="button" onClick={handleResetClick}>Reset</button>
      </div>
    </>
  )
}

