import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Todo.css'

export const Todo = ({ store }) => {
  const [input, setInput] = useState("")
  const handleInputEnterKey = k => k.key === "Enter" && input.trim() != "" && (store.add(input), setInput(""))

  useEffect(() => {
    localStorage.setItem(`${store.title} Todos`, JSON.stringify(store.todos))
    localStorage.setItem(`${store.title} Dones`, JSON.stringify(store.dones))
  }, [store.todos, store.dones, store.title])

  return (
    <div className='Todo sub-container'>
      <header>
        <div><span className={store.completed() === "NaN%" ? 'hide' : ''}>Completed: <span className='counter-stats'>{store.completed()}</span></span></div>
        <h1>{store.title}</h1>
      </header>
      <ul className='ul'>
        {store.todos.map(item => (<li key={item.id} className='li' onClick={() => store.markAsDone(item)}>{item.content}</li>))}
        {store.dones.map(item => (<li key={item.id} className='li dones' onClick={() => store.markAsTodo(item)}>{item.content}</li>))}
      </ul>
      <footer>
        <button className={`${store.dones.length === 0 ? 'hide' : 'midBtn'}`} onClick={() => store.deleteDones()} >Delete All Completed</button>
        <input
          type="text"
          className='input'
          value={input}
          placeholder="Type a goal and press Enter"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(k) => handleInputEnterKey(k)}
        />
      </footer>
    </div>
  )
}

Todo.propTypes = { store: PropTypes.object }