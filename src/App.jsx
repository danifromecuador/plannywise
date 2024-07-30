import { Store } from './store/store'
import './App.css'

export const App = () => {
  const store = Store()
  return (
    <div className='App'>
      <h1>App Component</h1>
      <div>Bears: {store.bears.amount}</div>
      <div>Cows: {store.cows.amount}</div>
      <button onClick={()=>store.bears.add()}>Add bear</button>
    </div>
  )
}