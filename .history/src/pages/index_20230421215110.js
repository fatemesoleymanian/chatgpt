import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Chatgpt</h1>
      <form>
        <input type="text" name="question" id="question" placeholder='Ask me anything...' />
      </form>
    </main>
  )
}
