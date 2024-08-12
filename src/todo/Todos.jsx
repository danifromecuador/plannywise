import './Todos.css'

export const Todos = ({ title, completedText, todos, dones, deleteBtnText, inputText }) => {
  if (!todos) {
    todos = []
  }
  let todosAndDones = todos.concat(dones)


  return (
    <div className='Todos'>
      <header>
        <span>{completedText ? completedText : "Completed"}: <span>16{completedText ? "h" : "%"}</span></span>
        <h1>{title}</h1>
      </header>
      <ul>
        {todosAndDones.map(item => (
          <li>{item}</li>
        ))}
      </ul>
      <footer>
        <button>{deleteBtnText ? deleteBtnText : "Delete Completed Goals"}</button>
        <input type="text" defaultValue={inputText ? inputText : "Type a new goal and press Enter"} />
      </footer>
    </div>
  )
}