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
      if (eventKeys.includes(pageId)) {
        // let's post a comment!
        try {
          postComment(req.body)
          res.status(200).json({ msg: 'comments post success!' })
        } catch (e) {
          console.log('comment post error:', e)
          res
            .status(408)
            .json({ msg: 'comments post error. Post did not go through' })
        }
      } else {
        // keys not valid
        console.log('Error: Page Id not found', slug, pageId)
        res.status(400).json({ msg: 'request page not found', slug, pageId })
      }
    } else {
      // wrong request -not for comments
      res.status(400).json({ msg: 'request not found.', slug, pageId })
    }
  } else {
    // must be a 'GET' req.
    try {
      const comments = await getPageComments(pageId)
      res.status(200).json({ msg: 'comment get request', comments })
    } catch (e) {
      console.log('comments get request error:', e)
      res.status(408).json({
        msg: 'comment get request error. Server not responding, Try again.',
      })
    }
  }
}
