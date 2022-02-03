import type { NextApiRequest, NextApiResponse } from 'next'
import { sendEmail } from 'utils'

export type Data = {
  // this is the response type
  msg: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { slug },
  } = req
  console.log(req.query)
  console.log(slug)

  if (req.method === 'POST') {
    console.log(req.body)

    // email
    if (slug === 'email') {
      sendEmail(req.body?.email, res)
    }

    // res.status(200).json({ msg: 'post request' })
  } else {
    // must be a 'GET' req.
    res.status(200).json({ msg: 'get request' })
  }
}
