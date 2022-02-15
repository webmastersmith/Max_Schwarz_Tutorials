import type { NextPage } from 'next'
import { PostsType } from 'types'
import styles from './allPosts.module.scss'
import { PostGrid } from 'components'

export const AllPosts: NextPage<PostsType> = ({ posts }): JSX.Element => {
  return (
    <section className={styles.posts}>
      <h1>All Posts</h1>
      <PostGrid posts={posts} />
    </section>
  )
}
