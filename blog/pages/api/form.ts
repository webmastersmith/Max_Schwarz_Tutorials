// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { mongoRun } from 'utils'

type Data = {
  msg: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const _response = JSON.parse(req.body)
    const response = { ..._response, date: new Date().toISOString() }

    const ok = await mongoRun(response).catch(console.error)
    console.log('ok', ok)

    if (ok) {
      res.status(201).json({ msg: 'Thank You, I Got it!' })
    } else {
      res
        .status(503)
        .json({ msg: 'Something went wrong, please try again later.' })
    }
  } else {
    // must be a get request.
  }
}
