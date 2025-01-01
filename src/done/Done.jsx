import { useState, useEffect } from 'react'
import { Store } from '../store/store'
import './Done.css'

export const Done = () => {
  const store = Store()
  const text = store.configs.language.current === "english" ? store.configs.language.text().english : store.configs.language.text().spanish
  const [input, setInput] = useState("")
  const [showModal, setShowModal] = useState("hide")
  const [showFooter, setShowFooter] = useState("")
  const handleInputEnterKey = k => k.key === "Enter" && input.trim() != "" && (store.tasks.add(input), setInput(""))
  const addCommonTask = (task) => store.tasks.addCommonTask(task)
  useEffect(() => localStorage.setItem("Completed Tasks", JSON.stringify(store.tasks.completed)), [store.tasks.completed])
  useEffect(() => localStorage.setItem("Worked Hours History", JSON.stringify(store.tasks.workedHoursHistory)), [store.tasks.workedHoursHistory])
  useEffect(() => localStorage.setItem("Common Tasks", JSON.stringify(store.tasks.commonTasks)), [store.tasks.commonTasks])

  return (
    <div className='Done'>
      <h1>{text.done.title}</h1>
      <div className="worked-hours sub-container">
        <h2>{text.done.totalWorkedHours.title}</h2>
        <div className="this">
          <div className="this-month"><span className='counter-stats'>{store.tasks.workedHours().month} h</span><span>{text.done.totalWorkedHours.last30}</span></div>
          <div className="this-week"><span className='counter-stats'>{store.tasks.workedHours().week} h</span><span>{text.done.totalWorkedHours.last7}</span></div>
          <div className="this-day"><span className='counter-stats'>{store.tasks.workedHours().day} h</span><span>{text.done.totalWorkedHours.today}</span></div>
        </div>
      </div>
      <div className="completed-tasks sub-container">
        <h2>{text.done.todayCompletedTasks.title}</h2>
        <div className="common-tasks this">
          <button className="this-month" onClick={() => addCommonTask("learn")}><span className='counter-stats'>{store.tasks.commonTasks.learn} h</span><span>LEARN</span></button>
          <button className="this-week" onClick={() => addCommonTask("code")}><span className='counter-stats'>{store.tasks.commonTasks.code} h</span><span>CODE</span></button>
          <button className="this-day" onClick={() => addCommonTask("apply")}><span className='counter-stats'>{store.tasks.commonTasks.apply} h</span><span>APPLY</span></button>
        </div>
        <ul className='ul'>{store.tasks.completed.map(item => (<li key={item.id} className='li dones'>{item.content}</li>))}</ul>
        <div className={`${showModal} modal`}>
          <p>{text.done.todayCompletedTasks.warning}</p>
          <div className="options">
            <button className='midBtn' onClick={() => (setShowModal("hide"), setShowFooter(""))}>{text.done.todayCompletedTasks.cancel}</button>
            <button className='midBtn' onClick={() => (store.tasks.deleteCompleted(), setShowModal("hide"), setShowFooter(""))}>{text.done.todayCompletedTasks.confirm}</button>
          </div>
        </div>
        <footer className={showFooter}>
          <button className={`${store.tasks.completed.length + store.tasks.commonTasksCounter() === 0 ? 'hide' : 'midBtn'}`} onClick={() => (setShowFooter("hide"), setShowModal(""))}>{text.done.todayCompletedTasks.delete}</button>
          <input
            type="text"
            className='input'
            value={input}
            placeholder={text.done.todayCompletedTasks.input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={k => handleInputEnterKey(k)}
          />
        </footer>
      </div>
    </div>
  )
}