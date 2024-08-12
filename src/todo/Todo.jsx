import { Store } from '../store/store.js'
import { Todos } from './Todos.jsx'
import './Todo.css'

export const Todo = () => {
  const store = Store()
  return (
    <div className='Todo'>
      <h1>Todo</h1>
      <Todos store={store.daily} />
      <Todos store={store.tasks} />
    </div>
  )
}