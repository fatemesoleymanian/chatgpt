// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method should be POST!' })
  }

  else {

    try {
      const url = 'https://api.openai.com/v1/chat/completions';
      const headers = {
        'Content-type': "application/json",
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
      }
      const data = {
        model: "gpt-3.5-turbo-0301",
        messages: [{ "role": "user", "content": message }]
      };
      const response = await axios.post(url, data, { headers: headers })

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "something went wrong..." })
    }
  }
}
