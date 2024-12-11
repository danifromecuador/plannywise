import { useEffect, useState } from 'react'
import { Store } from '../store/store.js'
import axios from 'axios'
import './Quote.css'

export const Quote = () => {
  const store = Store()
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")
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
        setQuote(response.data.content.slice(0, -1)) // Delete the last dot of the quote
        setAuthor(response.data.author)
      }
      catch (error) { console.error("Error fetching the quote: ", error.message) }
    }
    fetchQuote()
  }, [fetchNewQuote])

  const translateQuote = async () => {
    let quoteTranslated = await axios(`https://api.mymemory.translated.net/get?q=${quote}&langpair=en|es`)
    setQuote(quoteTranslated.data.responseData.translatedText)
  }

  useEffect(() => {
    if (store.language.current === "spanish") translateQuote()
  }, [author])

  return (
    <div className="motivational" onClick={catchNewQuote}>
      <p>{quote}</p>
      <p>{author}</p>
    </div>
  )
}