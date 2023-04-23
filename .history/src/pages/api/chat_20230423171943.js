// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
  const referer = req.headers.referer || req.headers.referrer

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method should be POST!' })
  }
  // else if (process.env.PUBLIC_NEXT_NODE_ENV !== 'development') {
  //   if (!referer || referer !== process.env.PUBLIC_NEXT_APP_URL) {
  //     res.status(401).json({ message: 'Unauthorized!' })
  //   }

  // }

  else {

    try {
      const { body } = req;
      const url = 'https://api.openai.com/v1/chat/completions';
      const headers = {
        'Content-type': "application/json",
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
      }

      const response = await axios.post(url, body, { headers: headers })
      res.status(200).json(response.data)

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "something went wrong..." })
    }
  }
}
