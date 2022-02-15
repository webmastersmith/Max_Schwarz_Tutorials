import type { NextPage } from 'next'
import { PostType } from 'types'
import styles from './postDetail.module.scss'
import { PostDetailHeader } from './postDetailHeader'
import { MdxImage } from 'components'

interface Props {
  post: PostType
}

export const PostDetail: NextPage<Props> = ({ post }): JSX.Element => {
  const { title, image, slug } = post
  const imagePath = `/images/posts/${slug}/${image}`

  return (
    <article className={styles.content}>
      <PostDetailHeader title={title} image={imagePath} />
      <MdxImage post={post} />
    </article>
  )
}
