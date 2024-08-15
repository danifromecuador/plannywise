import { Store } from '../store/store.js'
import { Todo } from './Todo.jsx'
import './Todos.css'

export const Todos = () => {
  const store = Store()
  return (
    <div className='Todos'>
      <h1>Todo</h1>
      <Todo store={store.daily} />
      <Todo store={store.weekly} />
      <Todo store={store.monthly} />
    </div>
  )
}