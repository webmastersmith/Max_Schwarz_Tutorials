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
  console.log('server req', req)
  console.log('server req', req.headers)

  if (req.method === 'POST') {
    const _response = JSON.parse(req.body)
    const response = { ..._response, date: new Date().toISOString() }

    const result = await mongoRun(response).catch((e) => {
      console.error('server eeerrror', e._response)
    })

    if (result) {
      res.status(201).json({ msg: 'Thank You, I Got it!' })
    } else {
      res.status(503).json({
        msg: 'Sorry server error, please try again later',
      })
    }
  } else {
    // must be a get request.
  }
}
