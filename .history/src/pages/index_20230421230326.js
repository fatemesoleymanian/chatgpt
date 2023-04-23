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

    sendMessage(inputValue);

    setInputValue('');
  }
  const sendMessage = (message) => {
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-type': "application/json",
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
    }
    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ "role": "user", "content": message }]
    };
    setIsLoading(true)

    axios.post(url, data, { headers: headers })
      .then((res) => {
        console.log(res)
        setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: res.data.choices[0].message.content }]);
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err)
      })

  }

  return (
    <div className="container ">
      <div className='flex flex-col h-screen bg-gray-900'>
        <h1 className='bg-gradient-to-r from-blue-500 to-purple-500 text-transparent
        bg-clip-text text-center py-3 font-bold text-6xl'>Chatgpt</h1>
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
      </div>
    </div>
  )
}
