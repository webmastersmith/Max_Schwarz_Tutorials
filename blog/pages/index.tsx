import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { Hero, FeaturedPosts } from 'components'
import { MatterType, PostTypes } from 'types'
import { getAllPosts } from 'utils'
import { serialize } from 'next-mdx-remote/serialize' //server-side only
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

interface Props {
  posts: PostTypes[]
}

const HomePage: NextPage<Props> = ({ posts }) => {
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

// interface StaticPropsType {
//   props: { posts: PostTypes[] }
// }

export const getStaticProps: GetStaticProps = async (context) => {
  const matterData: MatterType[] = getAllPosts(true)
  const posts = Promise.all(
    matterData.map(async (data: MatterType) => {
      const content = await serialize(data.content)
      return {
        ...data.frontMatter,
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
