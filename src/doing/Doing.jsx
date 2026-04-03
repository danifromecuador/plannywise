import { Store } from '../store/store.js'
import { selectLocalizedUiText } from '../store/language.js'
import { Clock } from './Clock.jsx'
import { Quote } from './Quote.jsx'
import { Footer } from './Footer.jsx'

export const Doing = () => {
  const text = Store(selectLocalizedUiText)

  return (
    <div className='Doing'>
      <h1>{text.doing.title}</h1>
      <Clock />
      <Quote />
      <Footer />
    </div>
  )
}