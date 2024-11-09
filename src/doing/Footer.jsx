import { useEffect, useState } from 'react'
import { Store } from '../store/store'
import './Footer.css'

export const Footer = () => {
  const store = Store()
  const [infoVisibility, setInfoVisibility] = useState(localStorage.getItem("infoVisibility" || "hide"))
  const [settingsVisibility, setSettingsVisibility] = useState(localStorage.getItem("settingsVisibility" || "hide"))

  const infoContentVisibility = () => {
    infoVisibility === "" ? setInfoVisibility("hide") : setInfoVisibility("")
    setSettingsVisibility("hide")
  }

  const settingsContentVisibility = () => {
    settingsVisibility === "" ? setSettingsVisibility("hide") : setSettingsVisibility("")
    setInfoVisibility("hide")
  }

  useEffect(() => localStorage.setItem("infoVisibility", infoVisibility), [infoVisibility])
  useEffect(() => localStorage.setItem("settingsVisibility", settingsVisibility), [settingsVisibility])

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
        <button onClick={()=>store.tasks.resetWorkedHoursHistory()}>reset <b>Total Worked Hours</b> counters</button>
        <p>change language: ESPAÑOL ENGLISH</p>
        <p>change theme: DARK WHITE</p>
        <p>common tasks: LEARN x_____CODE x_____APPLY x_____ADD NEW</p>
        <p>set timer: 5 10 15 20 30 60</p>
      </div>
    </div >
  )
}