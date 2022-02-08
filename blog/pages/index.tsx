import type { NextPage } from 'next'
import Head from 'next/head'
import { Hero, FeaturedPosts } from 'components'
import { PostTypes } from 'types'
import { uuid } from 'utils'
// import Image from 'next/image'
// import styles from '../styles/HomePage.module.css'

export const DummyPost: PostTypes[] = [
  {
    date: '2022-01-03',
    excerpt: 'This is my dummy post data',
    image: 'getting-started-nextjs.png',
    slug: 'bs',
    title: 'This is a dummy post.',
    id: uuid(''),
  },
  {
    date: '2022-01-03',
    excerpt: 'This is my dummy post data',
    image: 'getting-started-nextjs.png',
    slug: 'bs',
    title: 'This is a dummy post.',
    id: uuid(''),
  },
  {
    date: '2022-01-03',
    excerpt: 'This is my dummy post data',
    image: 'getting-started-nextjs.png',
    slug: 'bs',
    title: 'This is a dummy post.',
    id: uuid(''),
  },
  {
    date: '2022-01-03',
    excerpt: 'This is my dummy post data',
    image: 'getting-started-nextjs.png',
    slug: 'bs',
    title: 'This is a dummy post.',
    id: uuid(''),
  },
  {
    date: '2022-01-03',
    excerpt: 'This is my dummy post data',
    image: 'getting-started-nextjs.png',
    slug: 'bs',
    title: 'This is a dummy post.',
    id: uuid(''),
  },
]
const HomePage: NextPage = () => {
  // 1) hero -welcome page that present main product or yourself in the case of a blog.
  // 2) featured posts

  return (
    <div>
      <Head>
        <title>Featured Posts</title>
      </Head>
      <Hero />
      <FeaturedPosts posts={DummyPost} />
    </div>
  )
}

export default HomePage
