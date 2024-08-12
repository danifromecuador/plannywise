import { Todos } from './Todos.jsx'
import './Todo.css'

export const Todo = () => {
  return (
    <div className='Todo'>
      <h1>Todo</h1>
      <Todos title="Daily Goals" completed={100} todos={[1, 2, 3]} dones={[4, 5, 6]} />
      <Todos title="Weekly Goals" completed={50} todos={[1, 2, 3]} dones={[4, 5, 6]} />
      <Todos title="Monthly Goals" completed={0} todos={[1, 2, 3]} dones={[4, 5, 6]} />
      <Todos
        title="Completed Tasks"
        completedText="Worked Hours"
        completed={0.25} dones={[1, 2, 3]}
        deleteBtnText="Delete All Tasks"
        inputText="Type a completed task and press Enter"
      />
    </div>
  )
}