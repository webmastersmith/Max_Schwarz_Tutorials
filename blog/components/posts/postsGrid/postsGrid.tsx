import type { NextPage } from 'next'
import styles from './postsGrid.module.scss'
import { PostItem } from 'components'
import { PostsType } from 'types'

export const PostGrid: NextPage<PostsType> = ({ posts }): JSX.Element => {
  if (!posts.length) return <p>No post found</p>
  return (
    <ul className={styles.grid}>
      {posts.map((post) => {
        return <PostItem post={post} key={post.id} />
      })}
    </ul>
  )
}
