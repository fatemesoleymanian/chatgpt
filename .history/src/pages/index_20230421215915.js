import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }]);

    setInputValue('');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Chatgpt</h1>
      <form>
        <input type="text" name="question" id="question" placeholder='Ask me anything...'
          value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit" >Send</button>
      </form>
    </main>
  )
}
