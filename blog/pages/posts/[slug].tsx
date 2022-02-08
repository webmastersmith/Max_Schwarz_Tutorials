import type { NextPage } from 'next'
import { PostDetail } from 'components'

const DP = {
  date: '2022-01-03',
  excerpt: 'This is my dummy post data',
  image: 'getting-started-nextjs.png',
  slug: 'bs',
  title: 'This is a dummy post.',
  content: '# This is my first post',
}

const PostPage: NextPage = () => {
  const imagePath = `/images/posts/${DP.slug}/${DP.image}`

  return <PostDetail title={DP.title} image={imagePath} content={DP.content} />
}

export default PostPage
