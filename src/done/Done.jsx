import { useState, useEffect } from 'react'
import { Store } from '../store/store'
import './Done.css'

export const Done = () => {
  const store = Store()
  const [input, setInput] = useState("")
  const handleInputEnterKey = k => k.key === "Enter" && input.trim() != "" && (store.tasks.add(input), setInput(""))
  useEffect(() => localStorage.setItem("Completed Tasks", JSON.stringify(store.tasks.completed)), [store.tasks.completed])

  return (
    <div className='Done'>
      <h1>Done</h1>
      <div className="worked-hours sub-container">
        <h2>Worked Hours</h2>
        <div className="this">
          <div className="this-month"><span className='counter-stats'>12</span><span>This Month</span></div>
          <div className="this-week"><span className='counter-stats'>23</span><span>This Week</span></div>
          <div className="this-day"><span className='counter-stats'>2.25</span><span>This Day</span></div>
        </div>
      </div>
      <div className="completed-tasks sub-container">
        <h2>Completed Tasks</h2>
        <ul className='ul'>
          {store.tasks.completed.map(item => (<li key={item.id} className='li dones'>{item.content}</li>))}
        </ul>
        <footer>
          <button className={`${store.tasks.completed.length === 0 ? 'hide' : 'midBtn'}`} onClick={() => store.tasks.deleteCompleted()}>Delete All</button>
          <input
            type="text"
            className='input'
            value={input}
            placeholder='Type a completed task and press Enter'
            onChange={e => setInput(e.target.value)}
            onKeyDown={k => handleInputEnterKey(k)}
          />
        </footer>
      </div>
    </div>
  )
}