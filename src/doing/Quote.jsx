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
        const { data } = await axios.get('https://dummyjson.com/quotes/random')
        let content = (data.quote ?? '').trim()
        const authorName = (data.author ?? '').trim()
        if (content.length > 200) content = `${content.slice(0, 197)}...`
        if (store.configs.language.current === "spanish") await translateQuote(content)
        else setQuote(content)
        setAuthor(authorName || 'Unknown')
      } catch (error) {
        console.error("Error fetching the quote: ", error.message)
      }
    }
    fetchQuote()
  }, [fetchNewQuote, store.configs.language.current])

  const translateQuote = async (text) => {
    const { data } = await axios.get('https://api.mymemory.translated.net/get', {
      params: { q: text, langpair: 'en|es' },
    })
    setQuote(data.responseData.translatedText)
  }

  return (
    <div className="motivational" onClick={catchNewQuote}>
      <p>{quote}</p>
      <p>{author}</p>
    </div>
  )
}