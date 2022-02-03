import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllEventKeys, postComment, getPageComments } from 'utils'
import { Comments } from 'components'

export type ResData = {
  // this is the response type
  msg: string
  slug?: string
  pageId?: string
  comments?: Comments[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData>
) {
  const {
    query: { slugs },
  } = req
  const [slug, pageId] = slugs as string[]

  if (req.method === 'POST') {
    // this is a comment post
    if (slug === 'comments') {
      // get keys to check for valid pageId.
      const eventKeys = await getAllEventKeys()
      console.log(eventKeys)
      if (eventKeys.includes(pageId)) {
        console.log('im a comment post')
        // let's post a comment!
        postComment(req.body)
        res.status(200).json({ msg: 'comments post success!' })
      } else {
        // keys not valid
        res.status(200).json({ msg: 'comment wrong post pageId', slug, pageId })
      }
    } else {
      // wrong request -not for comments
      res.status(200).json({ msg: 'comment wrong post request', slug, pageId })
    }
  } else {
    // must be a 'GET' req.
    const comments = await getPageComments(pageId)
    res.status(200).json({ msg: 'comment get request', comments })
  }
}
