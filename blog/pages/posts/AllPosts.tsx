import type { NextPage } from 'next'
import { PostTypes } from 'types'

interface Props {
  posts: PostTypes
}

const AllPostsPage: NextPage<Props> = ({ posts }) => {
  return <div>AllPostsPage</div>
}

export default AllPostsPage
