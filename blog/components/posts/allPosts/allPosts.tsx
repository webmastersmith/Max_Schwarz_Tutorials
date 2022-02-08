import type { NextPage } from 'next'
import { PostTypes } from 'types'
import styles from './allPosts.module.scss'
import { PostGrid } from 'components'

interface Props {
  posts: PostTypes[]
}

export const AllPosts: NextPage<Props> = ({ posts }): JSX.Element => {
  return (
    <section className={styles.posts}>
      <h1>All Posts</h1>
      <PostGrid posts={posts} />
    </section>
  )
}
