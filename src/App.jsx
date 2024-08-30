import { Store } from './store/store.js'
import { Todos } from './todo/Todos.jsx'
import { Doing } from './doing/Doing.jsx'
import { Done } from './done/Done.jsx'
import { Footer } from './footer/Footer.jsx'
import './App.css'

export const App = () => {
  const mainSectionHeight = Store().footer.mainSectionHeight

  return (
    <div className='App'>
      <div className={`main-section ${mainSectionHeight === "Full" && 'full-height'}`}>
        <Todos />
        <Doing />
        <Done />
      </div >
      <Footer />
    </div>
  )
}