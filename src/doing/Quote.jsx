import { useEffect, useState } from 'react'
import { Store } from '../store/store.js'
import axios from 'axios'
import './Quote.css'

export const Quote = () => {
  const language = Store((s) => s.configs.language.current)
  const [quote, setQuote] = useState("One day, in retrospect, the years of struggle will strike you as the most beautiful")
  const [author, setAuthor] = useState("Sigmund Freud")
  const [fetchNewQuote, setFetchNewQuote] = useState("")
  const catchNewQuote = () => setFetchNewQuote((prev) => (prev === "yes" ? "" : "yes"))

  const translateQuote = async (text) => {
    const { data } = await axios.get('https://api.mymemory.translated.net/get', {
      params: { q: text, langpair: 'en|es' },
    })
    setQuote(data.responseData.translatedText)
  }

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const { data } = await axios.get('https://dummyjson.com/quotes/random')
        let content = (data.quote ?? '').trim()
        const authorName = (data.author ?? '').trim()
        if (content.length > 200) content = `${content.slice(0, 197)}...`
        if (language === "spanish") await translateQuote(content)
        else setQuote(content)
        setAuthor(authorName || 'Unknown')
      } catch (error) {
        console.error("Error fetching the quote: ", error.message)
      }
    }
    fetchQuote()
  }, [fetchNewQuote, language])

  return (
    <div className="motivational" onClick={catchNewQuote}>
      <p>{quote}</p>
      <p>{author}</p>
    </div>
  )
}