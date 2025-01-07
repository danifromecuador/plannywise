import { useEffect, useState } from 'react'
import { Store } from '../store/store'
import './Footer.css'

export const Footer = () => {
  const store = Store()
  const [input, setInput] = useState("")
  const [show1, setShow1] = useState(JSON.parse(localStorage.getItem("infoVisibility")) || false) // INFO (show or hide)
  const [show2, setShow2] = useState(JSON.parse(localStorage.getItem("settingsVisibility")) || false) // SETTINGS (show or hide)
  const [show3, setShow3] = useState(false) // "CONFIRM OR CANCEL" RESETING DIALOG (show or hide)
  const [show4, setShow4] = useState(true) // "RESET TOTAL WORKED HOURS" BUTTON (show or hide)
  const [show5, setShow5] = useState(false) // "Input for adding a new common task" (show or hide)
  const [show6, setShow6] = useState(true) // "Button for adding a new common task" (show or hide)
  // catch english or spanish json texts, this change when the user clicks on change language buttons
  const text = store.configs.language.current === "english" ? store.configs.language.text().english : store.configs.language.text().spanish

  const infoBtn = () => (setShow1(!show1), setShow2(false), setShow3(false), setShow4(true))
  const settingsBtn = () => (setShow2(!show2), setShow1(false), setShow3(false), setShow4(true))
  const resetBtn = () => (setShow3(true), setShow4(false))
  const cancelBtn = () => (setShow3(false), setShow4(true))
  const confirmBtn = () => (store.tasks.deleteCompleted(), store.tasks.resetWorkedHoursHistory(), setShow3(false), setShow4(true))
  const addCTBtn = () => (setShow5(true), setShow6(false))
  const handleCTInputKey = (k) => {
    k === "Escape" && (setShow5(false), setShow6(true), setInput(""))
    k === "Enter" && input !== "" && (store.configs.commonTasks.add(input), handleCTInputKey("Escape"))
  }

  useEffect(() => localStorage.setItem("infoVisibility", show1), [show1])
  useEffect(() => localStorage.setItem("settingsVisibility", show2), [show2])
  useEffect(() => localStorage.setItem("currentLanguage", store.configs.language.current), [store.configs.language])

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
        <div>
          <span>{text.doing.footer.settings.commonTasks.message}</span>
          <span>
            {store.configs.commonTasks.currents.map(e =>
              <span>
                <span>{e}</span>
                <button>X</button>
              </span>
            )}
          </span>
          <input
            type="text"
            className={`input ${!show5 && "hide"}`}
            placeholder='Type and press Enter'
            value={input}
            onKeyDown={k => handleCTInputKey(k.key)}
            onChange={e => setInput(e.target.value)}
          />
          <button className={`${!show6 && "hide"}`} onClick={() => addCTBtn()}>+</button>
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