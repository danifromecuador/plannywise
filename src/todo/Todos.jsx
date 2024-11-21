import { Store } from '../store/store.js'
import { Todo } from './Todo.jsx'

export const Todos = () => {
  const store = Store()
  const text = store.language.current === "english" ? store.language.text().english : store.language.text().spanish
  return (
    <div className='Todos'>
      <h1>{text.todo.title}</h1>
      <Todo store={store.daily} />
      <Todo store={store.weekly} />
      <Todo store={store.monthly} />
    </div>
  )
}