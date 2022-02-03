import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
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
    if (slug === 'email') {
      const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (validRegex.test(req.body?.email)) {
        console.log('success!')
        res.status(200).json({ msg: 'Thank you for your email' })
      } else {
        res.status(200).json({ msg: 'Please check email and try again.' })
      }
    }

    // res.status(200).json({ msg: 'post request' })
  } else {
    // must be a 'GET' req.
    res.status(200).json({ msg: 'get request' })
  }
}
