import type { NextPage } from 'next'
import styles from './postsGrid.module.scss'
import { PostItem } from 'components'
import { PostTypes } from 'types'

interface Props {
  posts: PostTypes[]
}

export const PostGrid: NextPage<Props> = ({ posts }): JSX.Element => {
  return (
    <ul className={styles.grid}>
      {posts.map((post) => {
        return <PostItem post={post} key={post.id} />
      })}
    </ul>
  )
}
