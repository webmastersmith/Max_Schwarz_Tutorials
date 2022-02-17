import type { NextPage, GetStaticProps } from 'next'
import { AllPosts } from 'components'
import { PostsType } from 'types'
import { getAllPosts } from 'utils'

const AllPostsPage: NextPage<PostsType> = ({ posts }) => {
  return <AllPosts posts={posts} />
}

export default AllPostsPage

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await getAllPosts()

  return {
    props: { posts },
  }
}
