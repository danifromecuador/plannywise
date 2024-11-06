import { useState } from 'react'
import './Footer.css'

export const Footer = () => {
  const [visible, setVisible] = useState("")
  return (
    <div className={`${visible} Footer sub-container`}>
      <button onClick={() => (setVisible("hide"))}>X</button>
      {/* TODO */}
      {/* create option for changing theme */}
      {/* hide learn code apply tasks */}
      {/* change pomodoro time to 5 to 55 minutes*/}
      {/* delete all worked hours history */}
      {/* change language */}
      <span>Created by  <a href="https://www.linkedin.com/in/danifromec/" target="_blank" rel="noopener noreferrer">Dani From Ecuador</a></span>
      <span>If you enjoy this app, please <a href="https://github.com/danifromecuador/plannywise" target='blank'>give it a ⭐</a></span>
      <span>If you&apos;re not hearing the alarm sound, check out <a href="https://github.com/danifromecuador/plannywise/issues/6" target='blank'>this issue</a></span>
      <span>If you&apos;d like to provide feedback, report issues, or suggest improvements, <a href="https://github.com/danifromecuador/plannywise/issues" target='blank'>click here</a></span>
    </div>
  )
}