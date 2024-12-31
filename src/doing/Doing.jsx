import { Store } from '../store/store.js'
import { Clock } from './Clock.jsx'
import { Quote } from './Quote.jsx'
import { Footer } from './Footer.jsx'

export const Doing = () => {
  const store = Store()
  const text = store.configs.language().current === "english" ? store.configs.language().text().english : store.configs.language().text().spanish

  return (
    <div className='Doing'>
      <h1>{text.doing.title}</h1>
      <Clock />
      <Quote />
      <Footer />
    </div>
  )
}