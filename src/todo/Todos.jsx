import { useShallow } from 'zustand/react/shallow'
import { Store } from '../store/store.js'
import { selectLocalizedUiText } from '../store/language.js'
import { Todo } from './Todo.jsx'

export const Todos = () => {
  const text = Store(selectLocalizedUiText)
  const { daily, weekly, monthly } = Store(
    useShallow((s) => ({ daily: s.daily, weekly: s.weekly, monthly: s.monthly })),
  )
  const { sectionTitles } = text.todo
  return (
    <div className='Todos'>
      <h1>{text.todo.title}</h1>
      <Todo store={daily} text={text} title={sectionTitles[0]} />
      <Todo store={weekly} text={text} title={sectionTitles[1]} />
      <Todo store={monthly} text={text} title={sectionTitles[2]} />
    </div>
  )
}