import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google';
import axios from 'axios';

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
  const sendMessage = (message) => {
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-type': "application/json",
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    }
    const data = {
      model: "gpt-4",
      messages: [{ "role": "user", "content": message }]
    };
    setIsLoading(true)

    axios.post(url, data, { headers: headers })
      .then((res) => {
        console.log(res)
      })

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Chatgpt</h1>
      {
        chatLog.map((message, index) => (
          <div key={index}>{message.message}</div>
        ))
      }
      <form onSubmit={handleSubmit}>
        <input type="text" name="question" id="question" placeholder='Ask me anything...'
          value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </main>
  )
}
