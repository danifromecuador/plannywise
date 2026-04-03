import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Store } from '../store/store.js'
import { selectLocalizedUiText } from '../store/language.js'
import './Done.css'

export const Done = () => {
  const { text, tasks, configs } = Store(
    useShallow((s) => ({
      text: selectLocalizedUiText(s),
      tasks: s.tasks,
      configs: s.configs,
    })),
  )
  const [input, setInput] = useState("")
  const [showModal, setShowModal] = useState("hide")
  const [showFooter, setShowFooter] = useState("")
  const handleInputEnterKey = (event) => {
    if (event.key !== "Enter") return
    if (input.trim() === "") return
    tasks.add(input)
    setInput("")
  }
  const addCommonTask = (task) => tasks.addCommonTask(task)

  return (
    <div className='Done'>
      <h1>{text.done.title}</h1>
      <div className="worked-hours sub-container">
        <h2>{text.done.totalWorkedHours.title}</h2>
        <div className="this">
          <div className="this-month"><span className='counter-stats'>{tasks.workedHours().month} h</span><span>{text.done.totalWorkedHours.last30}</span></div>
          <div className="this-week"><span className='counter-stats'>{tasks.workedHours().week} h</span><span>{text.done.totalWorkedHours.last7}</span></div>
          <div className="this-day"><span className='counter-stats'>{tasks.workedHours().day} h</span><span>{text.done.totalWorkedHours.today}</span></div>
        </div>
      </div>
      <div className="completed-tasks sub-container">
        <h2>{text.done.todayCompletedTasks.title}</h2>
        <div className="common-tasks this">
          {configs.commonTasks.currents.map((task, i) => {
            const variant = ['this-month', 'this-week', 'this-day'][i % 3]
            const hours = tasks.commonTasks[task.id] ?? 0
            return (
              <button
                key={task.id}
                type="button"
                className={variant}
                onClick={() => addCommonTask(task.id)}
              >
                <span className="counter-stats">{hours} h</span>
                <span>{task.label}</span>
              </button>
            )
          })}
        </div>
        <ul className='ul'>{tasks.completed.map(item => (<li key={item.id} className='li dones'>{item.content}</li>))}</ul>
        <div className={`${showModal} modal`}>
          <p>{text.done.todayCompletedTasks.warning}</p>
          <div className="options">
            <button className='midBtn' onClick={() => (setShowModal("hide"), setShowFooter(""))}>{text.done.todayCompletedTasks.cancel}</button>
            <button className='midBtn' onClick={() => (tasks.deleteCompleted(), setShowModal("hide"), setShowFooter(""))}>{text.done.todayCompletedTasks.confirm}</button>
          </div>
        </div>
        <footer className={showFooter}>
          <button className={`${tasks.completed.length + tasks.commonTasksCounter() === 0 ? 'hide' : 'midBtn'}`} onClick={() => (setShowFooter("hide"), setShowModal(""))}>{text.done.todayCompletedTasks.delete}</button>
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