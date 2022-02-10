import type { NextPage } from 'next'
import styles from './postsGrid.module.scss'
import { PostItem } from 'components'
import { PostTypes } from 'types'

interface Props {
  posts: PostTypes[]
}

export const PostGrid: NextPage<Props> = ({ posts }): JSX.Element => {
  let newPosts = posts

  if (!Array.isArray(posts)) {
    console.log('PostGrid empty array!!!!!!!!!!!!!!!!!!!')

    newPosts = [
      {
        date: '',
        title: '',
        image: '',
        excerpt: '',
        slug: '',
        id: '1',
        isFeatured: false,
        content: '',
      },
    ]
  }

  return (
    <ul className={styles.grid}>
      {newPosts.map((post) => {
        return <PostItem post={post} key={post.id} />
      })}
    </ul>
  )
}
