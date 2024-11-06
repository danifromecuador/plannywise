import { useState } from 'react'
import './Settings.css'

export const Settings = () => {
  const [visibility, setVisibility] = useState("")
  return (
    <div className={`Settings ${visibility}`}>
      <button className="close-settings" onClick={()=>setVisibility("")}>CLOSE</button>
    </div>
  )
}