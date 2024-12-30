import { Store } from '../store/store.js'
import { Clock } from './Clock.jsx'
import { Quote } from './Quote.jsx'
import { Footer } from './Footer.jsx'

export const Doing = () => {
  const store = Store()
  const text = store.language.current === "english" ? store.language.text().english : store.language.text().spanish

  return (
    <div className='Doing'>
      <h1>{text.doing.title}</h1>
      <Clock />
      <Quote />
      <Footer />
    </div>
  )
}