import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  // this is the response type
  method: string
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
    console.log('reqBody', req.body)
    console.log('typeof', typeof req.body)

    res.status(200).json({ method: 'post request' })
  } else {
    // must be a 'GET' req.
    res.status(200).json({ method: 'get request' })
  }
}
