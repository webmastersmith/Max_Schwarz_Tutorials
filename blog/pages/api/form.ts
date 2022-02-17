// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  msg: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { email, fullName, message } = JSON.parse(req.body)
    console.log('reqBody', email, fullName, message)
    res.status(201).json({ msg: 'Thank You, I Got it!' })
  } else {
    // must be a get request.
  }
}
