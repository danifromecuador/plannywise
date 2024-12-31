import { useEffect, useState } from 'react'
import { Store } from '../store/store.js'
import axios from 'axios'
import './Quote.css'

export const Quote = () => {
  const store = Store()
  const [quote, setQuote] = useState("One day, in retrospect, the years of struggle will strike you as the most beautiful")
  const [author, setAuthor] = useState("Sigmund Freud")
  const [fetchNewQuote, setFetchNewQoute] = useState("")
  const catchNewQuote = () => fetchNewQuote == "yes" ? setFetchNewQoute("") : setFetchNewQoute("yes")

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios('https://api.quotable.io/random', {
          params: {
            tags: 'motivational|success|change|character|future|inspirational',
            maxLength: 70,
          }
        })
        if (store.configs.language().current === "spanish") await translateQuote(response.data.content)
        else setQuote(response.data.content)
        setAuthor(response.data.author)
      }
      catch (error) {
        setQuote(quote)
        setAuthor(author)
        console.error("Error fetching the quote: ", error.message)
      }
    }
    fetchQuote()
  }, [fetchNewQuote])

  const translateQuote = async (quote) => {
    const quoteTranslated = await axios(`https://api.mymemory.translated.net/get?q=${quote}&langpair=en|es`)
    setQuote(quoteTranslated.data.responseData.translatedText)
  }

  return (
    <div className="motivational" onClick={catchNewQuote}>
      <p>{quote}</p>
      <p>{author}</p>
    </div>
  )
}