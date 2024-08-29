import { useState } from 'react'
import './Footer.css'

export const Footer = () => {
  const [showFooter, setShowFooter] = useState("")
  return (
    <div className={`${showFooter} Footer`}>
      <span>Created by  <a href="https://www.linkedin.com/in/danifromec/" target="_blank" rel="noopener noreferrer"> Dani Dev</a></span>
      <span>If you enjoy this app, please <a href="https://github.com/danifromecuador/plannywise" target='blank'>give it a ⭐</a></span>
      <span>If you're not hearing the alarm sound, please check out <a href="https://github.com/danifromecuador/plannywise/issues/6" target='blank'>this issue</a></span>
      <span>If you'd like to provide feedback, report issues, or suggest improvements, <a href="https://github.com/danifromecuador/plannywise/issues" target='blank'>click here</a></span>
      <button onClick={()=> setShowFooter("hide")}>X</button>
    </div>
  )
}