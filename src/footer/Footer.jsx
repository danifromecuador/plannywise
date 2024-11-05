import { useState } from 'react'
import { Store } from '../store/store'
import { Settings } from './Settings'
import './Footer.css'

export const Footer = () => {
  const store = Store()
  const [showFooter, setShowFooter] = useState("")
  const [visibilitySettingsModal, setVisibilitySettingsModal] = useState("hide")
  const changeVisibilitySettingsModal = () => {
    visibilitySettingsModal === "hide" ? setVisibilitySettingsModal("") : setVisibilitySettingsModal("hide")
  }
  return (
    <div className={`${showFooter} Footer`}>
      <span>Created by  <a href="https://www.linkedin.com/in/danifromec/" target="_blank" rel="noopener noreferrer">Dani From Ecuador</a></span>
      <span>If you enjoy this app, please <a href="https://github.com/danifromecuador/plannywise" target='blank'>give it a ⭐</a></span>
      <span>If you&apos;re not hearing the alarm sound, check out <a href="https://github.com/danifromecuador/plannywise/issues/6" target='blank'>this issue</a></span>
      <span>If you&apos;d like to provide feedback, report issues, or suggest improvements, <a href="https://github.com/danifromecuador/plannywise/issues" target='blank'>click here</a></span>
      <div className={visibilitySettingsModal}><Settings /></div>
      <button onClick={()=>changeVisibilitySettingsModal()}>SETTINGS</button>
      <button onClick={() => (setShowFooter("hide"), store.footer.setHeight())}>X</button>
    </div>
  )
}