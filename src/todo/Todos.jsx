import { Store } from '../store/store.js'
import { Todo } from './Todo.jsx'

export const Todos = () => {
  const store = Store()
  const title = store.configs.language.current === "english"
    ? ["Daily Goals", "Weekly Goals", "Monthly Goals"]
    : ["Objetivos Diarios", "Objetivos Semanales", "Objetivos Mensuales"]
  const text = store.configs.language.current === "english" ? store.configs.language.text().english : store.configs.language.text().spanish
  return (
    <div className='Todos'>
      <h1>{text.todo.title}</h1>
      <Todo store={store.daily} text={text} title={title[0]} />
      <Todo store={store.weekly} text={text} title={title[1]} />
      <Todo store={store.monthly} text={text} title={title[2]} />
    </div>
  )
}