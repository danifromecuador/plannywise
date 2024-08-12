import './Todo.css'

export const Todo = ({ store }) => {
  const todosDones = store.todos.concat(store.dones)
  return (
    <div className='Todos'>
      <header>
        <span>{store.achievedText}<span>{store.completed}</span></span>
        <h1>{store.title}</h1>
      </header>
      <ul>
        {todosDones.map(item => (<li>{item}</li>))}
      </ul>
      <footer>
        <button>{store.deleteBtnText}</button>
        <input type="text" defaultValue={store.inputText} />
      </footer>
    </div>
  )
}