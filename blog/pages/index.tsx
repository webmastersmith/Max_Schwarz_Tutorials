import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { Hero, FeaturedPosts } from 'components'
import { PostTypes } from 'types'
import { getFeaturedPost } from 'utils'
// import Image from 'next/image'
// import styles from '../styles/HomePage.module.css'

// export const DummyPost: PostTypes[] = [
//   {
//     date: '2022-01-03',
//     excerpt: 'This is my dummy post data',
//     image: 'getting-started-nextjs.png',
//     slug: 'bs',
//     title: 'This is a dummy post.',
//     id: uuid(''),
//   },
//   {
//     date: '2022-01-03',
//     excerpt: 'This is my dummy post data',
//     image: 'getting-started-nextjs.png',
//     slug: 'bs',
//     title: 'This is a dummy post.',
//     id: uuid(''),
//   },
//   {
//     date: '2022-01-03',
//     excerpt: 'This is my dummy post data',
//     image: 'getting-started-nextjs.png',
//     slug: 'bs',
//     title: 'This is a dummy post.',
//     id: uuid(''),
//   },
//   {
//     date: '2022-01-03',
//     excerpt: 'This is my dummy post data',
//     image: 'getting-started-nextjs.png',
//     slug: 'bs',
//     title: 'This is a dummy post.',
//     id: uuid(''),
//   },
//   {
//     date: '2022-01-03',
//     excerpt: 'This is my dummy post data',
//     image: 'getting-started-nextjs.png',
//     slug: 'bs',
//     title: 'This is a dummy post.',
//     id: uuid(''),
//   },
// ]

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

import { ParsedUrlQuery } from 'querystring'
// interface PropsType extends ParsedUrlQuery { slug: string }
export const getStaticProps: GetStaticProps = async (
  context
): Promise<StaticPropsType> => {
  // const { slug } = context.params as PropsType  //slug will pageId passed in from 'getStaticPaths'
  const posts = getFeaturedPost()
  return {
    props: {
      posts,
    },
  }
}
