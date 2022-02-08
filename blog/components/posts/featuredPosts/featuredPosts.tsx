import type { NextPage } from 'next'
import styles from './featuredPosts.module.scss'
import { PostGrid } from 'components'
import { PostTypes } from 'types'

interface Props {
  posts: PostTypes[]
}

export const FeaturedPosts: NextPage<Props> = ({ posts }): JSX.Element => {
  return (
    <section className={styles.latest}>
      <h2>Featured Posts</h2>
      <PostGrid posts={posts} />
    </section>
  )
}
