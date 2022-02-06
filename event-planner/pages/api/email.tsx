import type { NextApiRequest, NextApiResponse } from 'next'
import { sendEmail } from 'utils'

export type Data = {
  // this is the response type
  msg: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // is POST request
  if (req.method === 'POST') {
    try {
      const { status, msg } = await sendEmail(req.body?.email, res)
      res.status(status).json({ msg })
    } catch (e) {
      console.log('error posting email to db', e)
      res.status(422).json({ msg: 'message post failed.' })
    }
  } else {
    // must be a 'GET' req.
    res.status(200).json({ msg: 'get request' })
  }
}
