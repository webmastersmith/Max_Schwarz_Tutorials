import { AllPosts } from 'components'
import type { NextPage } from 'next'
import { PostTypes } from 'types'
import { DummyPost } from '../index'

interface Props {
  posts: PostTypes[]
}

const AllPostsPage: NextPage<Props> = () => {
  return <AllPosts posts={DummyPost} />
}

export default AllPostsPage
