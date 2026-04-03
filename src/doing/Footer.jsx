import { useState } from 'react'
import { Store } from '../store/store'
import './Footer.css'

export const Footer = () => {
  const store = Store()
  const [input, setInput] = useState("")
  const show1 = store.ui.footerInfoOpen
  const show2 = store.ui.footerSettingsOpen
  const [show3, setShow3] = useState(false) // "CONFIRM OR CANCEL" RESETING DIALOG (show or hide)
  const [show4, setShow4] = useState(true) // "RESET TOTAL WORKED HOURS" BUTTON (show or hide)
  const [show5, setShow5] = useState(false) // "Input for adding a new common task" (show or hide)
  const [show6, setShow6] = useState(true) // "Button for adding a new common task" (show or hide)
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState("")
  // catch english or spanish json texts, this change when the user clicks on change language buttons
  const text = store.configs.language.current === "english" ? store.configs.language.text().english : store.configs.language.text().spanish

  const infoBtn = () => (store.toggleFooterInfo(), setShow3(false), setShow4(true))
  const settingsBtn = () => (store.toggleFooterSettings(), setShow3(false), setShow4(true))
  const resetBtn = () => (setShow3(true), setShow4(false))
  const cancelBtn = () => (setShow3(false), setShow4(true))
  const confirmBtn = () => (store.tasks.deleteCompleted(), store.tasks.resetWorkedHoursHistory(), setShow3(false), setShow4(true))
  const addCTBtn = () => (setShow5(true), setShow6(false))
  const handleCTInputKey = k => {
    k === "Escape" && (setShow5(false), setShow6(true), setInput(""))
    k === "Enter" && input !== "" && (store.configs.commonTasks.add(input), handleCTInputKey("Escape"))
  }
  const startEdit = (task) => {
    setEditingId(task.id)
    setEditValue(task.label)
  }

  const handleEditKey = (e, taskId) => {
    if (e.key === "Escape") {
      setEditingId(null)
      setEditValue("")
    }
    if (e.key === "Enter") {
      const v = e.currentTarget.value.trim()
      if (v !== "") {
        store.configs.commonTasks.update(taskId, v)
        setEditingId(null)
      }
    }
  }

  const handleRemoveCTBtn = (i) => {
    const task = store.configs.commonTasks.currents[i]
    if (task && editingId === task.id) {
      setEditingId(null)
      setEditValue("")
    }
    store.configs.commonTasks.remove(i)
  }

  return (
    <div className="Footer sub-container">
      <div className='header'>
        <button className='midBtn' onClick={infoBtn}>{text.doing.footer.info.btnTitle}</button>
        <button className='midBtn' onClick={settingsBtn}>{text.doing.footer.settings.btnTitle}</button >
      </div >
      <div className={` ${!show1 && "hide"} info-content sub-container`}>
        <span>{text.doing.footer.info.created}<a href="https://www.linkedin.com/in/danifromec/" target="_blank"> Dani From Ecuador</a></span>
        <span>{text.doing.footer.info.star}<a href="https://github.com/danifromecuador/plannywise" target='blank'>{text.doing.footer.info.starLink}</a></span>
        <span>{text.doing.footer.info.issue}<a href="https://github.com/danifromecuador/plannywise/issues/6" target='blank'>{text.doing.footer.info.issueLink}</a></span>
        <span>{text.doing.footer.info.suggest}<a href="https://github.com/danifromecuador/plannywise/issues" target='blank'>{text.doing.footer.info.suggestLink}</a></span>
      </div>
      <div className={`${!show2 && "hide"} settings-content sub-container`}>
        <div>
          <div className={`${!show3 && "hide"} confirm-dialog`}>
            <p>{text.doing.footer.settings.reset.warning}</p>
            <div className='header'>
              <button className='midBtn' onClick={cancelBtn}>{text.doing.footer.settings.reset.cancel}</button>
              <button className='midBtn' onClick={confirmBtn}>{text.doing.footer.settings.reset.confirm}</button>
            </div>
          </div>
          <div className="setting-option">
            <span className={`${!show4 && "hide"}`}>{text.doing.footer.settings.reset.message}</span>
            <button className={`${!show4 && "hide"} midBtn`} onClick={resetBtn}>{text.doing.footer.settings.reset.button}</button>
          </div>
        </div>
        <div>{text.doing.footer.settings.language.message}
          <button onClick={() => store.configs.language.setCurrent("spanish")}>ESPAÑOL</button>
          <button onClick={() => store.configs.language.setCurrent("english")}>ENGLISH</button>
        </div>
        <div>
          <span>{text.doing.footer.settings.theme.message}</span>
          <button>{text.doing.footer.settings.theme.dark}</button>
          <button>{text.doing.footer.settings.theme.light}</button>
        </div>
        <div className="common-tasks-block">
          <span>{text.doing.footer.settings.commonTasks.message}</span>
          <div className="common-tasks-settings">
            {store.configs.commonTasks.currents.map((task, i) => (
              <div key={task.id} className="common-task-row">
                {editingId === task.id ? (
                  <input
                    type="text"
                    className="input common-task-edit-input"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => handleEditKey(e, task.id)}
                    autoFocus
                  />
                ) : (
                  <>
                    <span className="common-task-label">{task.label}</span>
                    <button
                      type="button"
                      className="midBtn common-task-edit-btn"
                      onClick={() => startEdit(task)}
                      title={text.doing.footer.settings.commonTasks.edit}
                    >
                      {text.doing.footer.settings.commonTasks.edit}
                    </button>
                    <button
                      type="button"
                      className="midBtn common-task-remove-btn"
                      onClick={() => handleRemoveCTBtn(i)}
                      title={text.doing.footer.settings.commonTasks.remove}
                      aria-label={text.doing.footer.settings.commonTasks.remove}
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
          <input
            type="text"
            className={`input ${!show5 && "hide"}`}
            placeholder={text.doing.footer.settings.commonTasks.inputPlaceHolder}
            value={input}
            onKeyDown={k => handleCTInputKey(k.key)}
            onChange={e => setInput(e.target.value)}
          />
          <button type="button" className={`${!show6 && "hide"}`} onClick={() => addCTBtn()}>+</button>
        </div>
        <div>
          <span>{text.doing.footer.settings.timer.message}</span>
          <button>5</button>
          <button>10</button>
          <button>15</button>
          <button>20</button>
          <button>30</button>
          <button>60</button>
        </div>
      </div>
    </div >
  )
}