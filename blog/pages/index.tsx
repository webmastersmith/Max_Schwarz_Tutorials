import type { NextPage } from 'next'
import Head from 'next/head'
import { Hero, FeaturedPosts } from 'components'
// import Image from 'next/image'
// import styles from '../styles/HomePage.module.css'

const HomePage: NextPage = () => {
  // 1) hero -welcome page that present main product or yourself in the case of a blog.
  // 2) featured posts

  return (
    <div>
      <Head>
        <title>Featured Posts</title>
      </Head>
      <Hero />
      <FeaturedPosts />
    </div>
  )
}

export default HomePage
