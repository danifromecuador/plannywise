import { useState } from 'react'
import './Todo.css'

export const Todo = ({ store }) => {
  const todosDones = store.todos.concat(store.dones)
  const [input, setInput] = useState("")

  const handleInputEnterKey = (k) => {
    if (k.key === "Enter") {
      store.add(input)
      setInput("")
    }
  }

  return (
    <div className='Todos'>
      <header>
        <span>Completed: <span>{store.completed}</span></span>
        <h1>{store.title}</h1>
      </header>
      <ul>
        {todosDones.map(item => (<li key={item}>{item}</li>))}
      </ul>
      <footer>
        <button>Delete All Completed</button>
        <input
          type="text"
          value={input}
          placeholder="Type a goal and press Enter"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(k) => handleInputEnterKey(k)}
        />
      </footer>
    </div>
  )
}