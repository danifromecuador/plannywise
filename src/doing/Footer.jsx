import { useEffect, useState } from 'react'
import { Store } from '../store/store'
import './Footer.css'

export const Footer = () => {
  const store = Store()
  const [show1, setShow1] = useState(localStorage.getItem("infoVisibility") || "hide") // INFO
  const [show2, setShow2] = useState(localStorage.getItem("settingsVisibility") || "hide") // SETTINGS
  const [show3, setShow3] = useState("hide") // "CONFIRM OR CANCEL" RESETING DIALOG
  const [show4, setShow4] = useState("") // "RESET TOTAL WORKED HOURS" BUTTON

  const infoContentVisibility = () => (show1 === "show" ? setShow1("hide") : setShow1("show"), setShow2("hide"))
  const settingsContentVisibility = () => (show2 === "show" ? setShow2("hide") : setShow2("show"), setShow1("hide"))
  const resetBtn = () => (setShow3("show"), setShow4("hide"))
  const cancelBtn = () => (setShow3("hide"), setShow4("show"))
  const confirmBtn = () => (store.tasks.resetWorkedHoursHistory(), setShow3("hide"), setShow4(""))

  useEffect(() => localStorage.setItem("infoVisibility", show1), [show1])
  useEffect(() => localStorage.setItem("settingsVisibility", show2), [show2])

  return (
    <div className="Footer sub-container">
      <div className='header'>
        <button className='midBtn' onClick={() => infoContentVisibility()}>INFO</button>
        < button className='midBtn' onClick={() => settingsContentVisibility()}> SETTINGS</button >
      </div >
      <div className={` ${show1} info-content sub-container`}>
        <span>Created by  <a href="https://www.linkedin.com/in/danifromec/" target="_blank" rel="noopener noreferrer">Dani From Ecuador</a></span>
        <span>If you enjoy this app, please <a href="https://github.com/danifromecuador/plannywise" target='blank'>give it a ⭐</a></span>
        <span>If you&apos;re not hearing the alarm sound, check out <a href="https://github.com/danifromecuador/plannywise/issues/6" target='blank'>this issue</a></span>
        <span>If you&apos;d like to provide feedback, report issues, or suggest improvements, <a href="https://github.com/danifromecuador/plannywise/issues" target='blank'>click here</a></span>
      </div>
      <div className={`${show2} settings-content sub-container`}>
        <div className={`${show3} confirm-dialog sub-container`}>
          <p>This action will reset all your stats, are you sure?</p>
          <div className='header'>
            <button className='midBtn' onClick={() => cancelBtn()}>Cancel</button>
            <button className='midBtn' onClick={() => confirmBtn()}>Yes, Delete All!</button>
          </div>
        </div>
        <button className={`${show4} midBtn`} onClick={() => resetBtn()}>reset <b>Total Worked Hours</b> counters</button>
        <p>change language: ESPAÑOL ENGLISH</p>
        <p>change theme: DARK WHITE</p>
        <p>common tasks: LEARN x_____CODE x_____APPLY x_____ADD NEW</p>
        <p>set timer: 5 10 15 20 30 60</p>
      </div>
    </div >
  )
}