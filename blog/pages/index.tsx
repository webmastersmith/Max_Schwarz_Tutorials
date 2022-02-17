import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { Hero, FeaturedPosts } from 'components'
import { PostsType } from 'types'
import { getFeaturedPosts } from 'utils'

const HomePage: NextPage<PostsType> = ({ posts }) => {
  // 1) hero -welcome page that present main product or yourself in the case of a blog.
  // 2) featured posts
  // const Component = React.useMemo(() => getMDXComponent(code), [code])
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

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await getFeaturedPosts()
  return {
    props: { posts },
  }
}
