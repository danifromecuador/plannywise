import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Todo.css'

export const Todo = ({ store, sliceID }) => {
  const [input, setInput] = useState("")  
  // console.log(sliceID);
  
  const handleInputEnterKey = k => k.key === "Enter" && input.trim() != "" && (store.add(input, sliceID), setInput(""))

  useEffect(()=>{
    localStorage.setItem(`${store.title} Todos`, JSON.stringify(store.todos))
    localStorage.setItem(`${store.title} Dones`, JSON.stringify(store.dones))
  },[store.todos, store.dones])

  return (
    <div className='Todo'>
      <header>
        <div><span className={store.completed(sliceID) === "NaN%" ? 'hide' : ''}>Completed: <span>{store.completed(sliceID)}</span></span></div>
        <h1>{store.title}</h1>
      </header>
      <ul>
        {store.todos.map(item => (<li key={item.id} onClick={() => store.markAsDone(item, sliceID)}>{item.content}</li>))}
        {store.dones.map(item => (<li className='dones' onClick={() => store.markAsTodo(item, sliceID)} key={item.id}>{item.content}</li>))}
      </ul>
      <footer>
        <button onClick={() => store.deleteDones(sliceID)} className={`${store.dones.length === 0 ? 'hide' : ''}`}>Delete All Completed</button>
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

Todo.propTypes = { store: PropTypes.object }