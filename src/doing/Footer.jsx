import { useEffect, useState } from 'react'
import { Store } from '../store/store'
import './Footer.css'

export const Footer = () => {
  const store = Store()
  const [show1, setShow1] = useState(JSON.parse(localStorage.getItem("infoVisibility")) || false) // INFO (show or hide)
  const [show2, setShow2] = useState(JSON.parse(localStorage.getItem("settingsVisibility")) || false) // SETTINGS (show or hide)
  const [show3, setShow3] = useState(false) // "CONFIRM OR CANCEL" RESETING DIALOG (show or hide)
  const [show4, setShow4] = useState(true) // "RESET TOTAL WORKED HOURS" BUTTON (show or hide)

  const infoBtn = () => (setShow1(!show1), setShow2(false), setShow3(false), setShow4(true))
  const settingsBtn = () => (setShow2(!show2), setShow1(false), setShow3(false), setShow4(true))
  const resetBtn = () => (setShow3(true), setShow4(false))
  const cancelBtn = () => (setShow3(false), setShow4(true))
  const confirmBtn = () => (store.tasks.deleteCompleted(), store.tasks.resetWorkedHoursHistory(), setShow3(false), setShow4(true))

  useEffect(() => localStorage.setItem("infoVisibility", show1), [show1])
  useEffect(() => localStorage.setItem("settingsVisibility", show2), [show2])

  return (
    <div className="Footer sub-container">
      <div className='header'>
        <button className='midBtn' onClick={infoBtn}>INFO</button>
        <button className='midBtn' onClick={settingsBtn}> SETTINGS</button >
      </div >
      <div className={` ${!show1 && "hide"} info-content sub-container`}>
        <span>Created by  <a href="https://www.linkedin.com/in/danifromec/" target="_blank" rel="noopener noreferrer">Dani From Ecuador</a></span>
        <span>If you enjoy this app, please <a href="https://github.com/danifromecuador/plannywise" target='blank'>give it a ⭐</a></span>
        <span>If you&apos;re not hearing the alarm sound, check out <a href="https://github.com/danifromecuador/plannywise/issues/6" target='blank'>this issue</a></span>
        <span>If you&apos;d like to provide feedback, report issues, or suggest improvements, <a href="https://github.com/danifromecuador/plannywise/issues" target='blank'>click here</a></span>
      </div>
      <div className={`${!show2 && "hide"} settings-content sub-container`}>
        <div className='sub-container'>
          <div className={`${!show3 && "hide"} confirm-dialog sub-container`}>
            <p>This action will reset all your stats, are you sure?</p>
            <div className='header'>
              <button className='midBtn' onClick={cancelBtn}>Cancel</button>
              <button className='midBtn' onClick={confirmBtn}>Yes, Reset All!</button>
            </div>
          </div>
          <div className="setting-option">
            <span className={`${!show4 && "hide"}`}>reset <b>Total Worked Hours</b> counters: </span>
            <button className={`${!show4 && "hide"} midBtn`} onClick={resetBtn}>Reset</button>
          </div>
        </div>
        <div className='sub-container'>change language: ESPAÑOL ENGLISH</div>
        <div className='sub-container'>change theme: DARK WHITE</div>
        <div className='sub-container'>common tasks: LEARN x_____CODE x_____AdivLY x_____ADD NEW</div>
        <div className='sub-container'>set timer: 5 10 15 20 30 60</div>
      </div>
    </div >
  )
}