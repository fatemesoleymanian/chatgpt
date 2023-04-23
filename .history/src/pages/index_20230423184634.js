import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google';
import axios from 'axios';
import TypingAnimation from '@/components/TypingAnimation';

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
  const sendMessage = async (message) => {
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

    await axios.post(url, data, { headers: headers })
      .then((res) => {
        // console.log(res)
        setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: res.data.choices[0].message.content }]);
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false);
        // console.log(err)
      })

  }

  return (
    <div className="container mx-auto max-w-full">
      <div className='flex flex-col h-screen  overflow-y-scroll bg-gray-900'>
        <div className='bg-gray-900 fixed top-0 text-center'>
          <h1 className='bg-gradient-to-r from-blue-500 to-purple-500 text-transparent
        bg-clip-text text-center py-3 font-bold text-6xl'>Chatgpt</h1>
        </div>
        <div className='flex-grow p-6 pb-32'>
          <div className='flex flex-col space-y-4 pt-24'>
            {
              chatLog.map((message, index) => (
                <div key={index} className={`flex md:mx-14 lg:mx-20 ${message.type === 'user' ? 'justify-end Nokia:ml-24' : 'justify-start Nokia:mr-20'
                  }`}>
                  <div className={`${message.type === 'user' ? 'bg-purple-500 p-4' : 'bg-gray-800 p-6'}
                  rounded-lg text-white whitespace-pre-wrap mb-8`}>
                    {message.message}
                  </div>
                </div>
              ))
            }
            {
              isLoading &&
              <div key={chatLog.length} className="flex justify-start">
                <div className='bg-gray-800 rounded-lg p-4 text-white max-w-sm'>
                  <TypingAnimation />

                </div>
              </div>
            }
          </div>
        </div>

        <form onSubmit={handleSubmit} className={'flex-none p-6 md:mx-10 lg:mx-20 fixed bottom-0 left-0 right-0'}>
          <div className='flex rounded-lg border border-gray-700 bg-gray-800'>
            <input type="text" name="question" id="question" placeholder='Ask me anything...'
              value={inputValue} onChange={(e) => setInputValue(e.target.value)}
              className={'flex-grow px-4 py-2 bg-transparent text-white focus:outline-none'} />
            <button type="submit" className='bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold
            focus:outline-none hover:bg-purple-600 transition-colors duration-300'
              disabled={isLoading} > {isLoading ? "Processing..." : "Send"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
