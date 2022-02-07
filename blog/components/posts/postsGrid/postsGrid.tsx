import type { NextPage } from 'next'
import styles from './postsGrid.module.scss'
import { PostItem } from 'components'

interface Props {
  posts: string[]
}

export const PostGrid: NextPage<Props> = ({ posts }): JSX.Element => {
  return (
    <ul className={styles.grid}>
      {posts.map((post) => {
        return <PostItem post={post} key={post} />
      })}
    </ul>
  )
}
