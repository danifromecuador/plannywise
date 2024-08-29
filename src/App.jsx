import { Todos } from './todo/Todos.jsx'
import { Doing } from './doing/Doing.jsx'
import { Done } from './done/Done.jsx'
import { Footer } from './footer/Footer.jsx'
import './App.css'

export const App = () => (
  <div className='App'>
    <div className='main-section'>
      <Todos />
      <Doing />
      <Done />
    </div >
    <div className="main-footer">
      <Footer />
    </div>
  </div>
)