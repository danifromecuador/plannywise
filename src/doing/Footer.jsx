import { useState } from 'react'
import './Footer.css'

export const Footer = () => {
  const [infoVisibility, setInfoVisibility] = useState("")
  const [settingsVisibility, setSettingsVisibility] = useState("hide")

  const infoContentVisibility = () => {
    infoVisibility === "" ? setInfoVisibility("hide") : setInfoVisibility("")
    setSettingsVisibility("hide")
  }

  const settingsContentVisibility = () => {
    settingsVisibility === "hide" ? setSettingsVisibility("") : setSettingsVisibility("hide")
    setInfoVisibility("hide")
  }

  return (
    <div className="Footer sub-container">
      <div className='header'>
        <button onClick={() => infoContentVisibility()}>INFO</button>
        < button onClick={() => settingsContentVisibility()}> SETTINGS</button >
      </div >
      <div className={`info-content ${infoVisibility} sub-container`}>
        <span>Created by  <a href="https://www.linkedin.com/in/danifromec/" target="_blank" rel="noopener noreferrer">Dani From Ecuador</a></span>
        <span>If you enjoy this app, please <a href="https://github.com/danifromecuador/plannywise" target='blank'>give it a ⭐</a></span>
        <span>If you&apos;re not hearing the alarm sound, check out <a href="https://github.com/danifromecuador/plannywise/issues/6" target='blank'>this issue</a></span>
        <span>If you&apos;d like to provide feedback, report issues, or suggest improvements, <a href="https://github.com/danifromecuador/plannywise/issues" target='blank'>click here</a></span>
      </div>
      <div className={`settings-content ${settingsVisibility} sub-container`}>
        <p>create option for changing theme</p>
        <p>hide learn code apply tasks</p>
        <p>hide learn code apply tasks</p>
        <p>change pomodoro time to 5 to 55 minutes</p>
        <p>delete all worked hours history</p>
        <p>change language</p>
      </div>
    </div >
  )
}