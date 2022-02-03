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
  // is POST request
  if (req.method === 'POST') {
    sendEmail(req.body?.email, res)
  } else {
    // must be a 'GET' req.
    res.status(200).json({ msg: 'get request' })
  }
}
