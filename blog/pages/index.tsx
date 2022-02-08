import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { Hero, FeaturedPosts } from 'components'
import { PostTypes } from 'types'
import { getFeaturedPost } from 'utils'

interface Props {
  posts: PostTypes[]
}

const HomePage: NextPage<Props> = ({ posts }) => {
  // 1) hero -welcome page that present main product or yourself in the case of a blog.
  // 2) featured posts

  return (
    <div>
      <Head>
        <title>Featured Posts</title>
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </div>
  )
}

export default HomePage

interface StaticPropsType {
  props: { posts: PostTypes[] }
}

export const getStaticProps: GetStaticProps = async (
  context
): Promise<StaticPropsType> => {
  const posts = getFeaturedPost()
  return {
    props: {
      posts,
    },
  }
}
