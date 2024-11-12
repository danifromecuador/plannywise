import { useEffect, useState } from 'react'
import { Store } from '../store/store'
import './Footer.css'

export const Footer = () => {
  const store = Store()
  const [hide1, setHide1] = useState(localStorage.getItem("infoVisibility" || "hide"))
  const [hide2, setHide2] = useState(localStorage.getItem("settingsVisibility" || "hide"))
  const [hide3, setHide3] = useState("hide")
  const [hide4, setHide4] = useState("")
  const infoContentVisibility = () => {
    hide1 === "" ? setHide1("hide") : setHide1("")
    setHide2("hide")
  }

  const settingsContentVisibility = () => {
    hide2 === "" ? setHide2("hide") : setHide2("")
    setHide1("hide")
  }

  const resetBtn = () => {
    setHide3("")
    setHide4("hide")
  }

  const cancelBtn = () => {
    setResetVisibility("")
    setCancelDeleteVisibility("")
  }

  const confirmBtn = () => {
    // call the delete all store function
    console.log("all was deleted")
    setResetVisibility("")
    setCancelDeleteVisibility("hide")
  }

  useEffect(() => localStorage.setItem("infoVisibility", hide1), [hide1])
  useEffect(() => localStorage.setItem("settingsVisibility", hide2), [hide2])

  return (
    <div className="Footer sub-container">
      <div className='header'>
        <button onClick={() => infoContentVisibility()}>INFO</button>
        < button onClick={() => settingsContentVisibility()}> SETTINGS</button >
      </div >
      <div className={`info-content ${hide1} sub-container`}>
        <span>Created by  <a href="https://www.linkedin.com/in/danifromec/" target="_blank" rel="noopener noreferrer">Dani From Ecuador</a></span>
        <span>If you enjoy this app, please <a href="https://github.com/danifromecuador/plannywise" target='blank'>give it a ⭐</a></span>
        <span>If you&apos;re not hearing the alarm sound, check out <a href="https://github.com/danifromecuador/plannywise/issues/6" target='blank'>this issue</a></span>
        <span>If you&apos;d like to provide feedback, report issues, or suggest improvements, <a href="https://github.com/danifromecuador/plannywise/issues" target='blank'>click here</a></span>
      </div>
      <div className={`settings-content ${hide2} sub-container`}>
        <div className={`${hide3}`}>
          <p>This action will reset all your stats, are you sure?</p>
          <div>
            <button onClick={() => cancelBtn()}>CANCEL</button>
            <button onClick={() => store.tasks.resetWorkedHoursHistory()}>DELETE ALL!</button>
          </div>
        </div>
        <button className={`${hide4}`} onClick={() => resetBtn()}>reset <b>Total Worked Hours</b> counters</button>
        <p>change language: ESPAÑOL ENGLISH</p>
        <p>change theme: DARK WHITE</p>
        <p>common tasks: LEARN x_____CODE x_____APPLY x_____ADD NEW</p>
        <p>set timer: 5 10 15 20 30 60</p>
      </div>
    </div >
  )
}