import type { NextPage, GetStaticProps } from 'next'
import { AllPosts } from 'components'
import { PostTypes } from 'types'
import { getAllPosts } from 'utils'

interface Props {
  posts: PostTypes[]
}

const AllPostsPage: NextPage<Props> = ({ posts }) => {
  return <AllPosts posts={posts} />
}

export default AllPostsPage

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await getAllPosts()
  return {
    props: {
      posts,
    },
  }
}
