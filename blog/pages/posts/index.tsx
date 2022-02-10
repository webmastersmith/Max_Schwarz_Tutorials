import type { NextPage, GetStaticProps } from 'next'
import { AllPosts } from 'components'
import { PostTypes, MatterType } from 'types'
import { getAllPosts } from 'utils'
import { serialize } from 'next-mdx-remote/serialize'

interface Props {
  posts: PostTypes[]
}

const AllPostsPage: NextPage<Props> = ({ posts }) => {
  return <AllPosts posts={posts} />
}

export default AllPostsPage

export const getStaticProps: GetStaticProps = async (context) => {
  const matterData = getAllPosts()
  //{ content, frontMatter: newData }
  const posts = await Promise.all(
    matterData.map(async (post: MatterType) => {
      const content = await serialize(post.content)
      return {
        ...post.frontMatter,
        content,
      }
    })
  )

  return {
    props: {
      posts,
    },
  }
}
