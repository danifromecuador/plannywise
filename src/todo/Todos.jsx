import './Todos.css'

export const Todos = ({ title, completedText, deleteBtnText, inputText }) => {
  return (
    <div className='Todos'>
      <header>
        <span>{completedText? completedText : "Completed"}: <span>16{completedText? "h" : "%"}</span></span>
        <h1>{title}</h1>
      </header>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
      <footer>
        <button>{deleteBtnText? deleteBtnText : "Delete Completed Goals"}</button>
        <input type="text" defaultValue={inputText? inputText : "Type a new goal and press Enter"} />
      </footer>
    </div>
  )
}