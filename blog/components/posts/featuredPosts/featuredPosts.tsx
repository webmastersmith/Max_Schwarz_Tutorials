import type { NextPage } from 'next'
import styles from './featuredPosts.module.scss'
import { PostGrid } from 'components'
import { PostsType } from 'types'

export const FeaturedPosts: NextPage<PostsType> = ({ posts }): JSX.Element => {
  return (
    <section className={styles.latest}>
      <h2>Featured Posts</h2>
      <PostGrid posts={posts} />
    </section>
  )
}
