import type { NextPage } from 'next'
import styles from './postDetail.module.scss'
import { PostDetailHeader } from './postDetailHeader'
// import ReactMarkdown from 'react-markdown'

interface Props {
  title: string
  image: string
  content: string
}

export const PostDetail: NextPage<Props> = ({
  title,
  image,
  content,
}): JSX.Element => {
  return (
    <article className={styles.content}>
      <PostDetailHeader title={title} image={image} />
    </article>
  )
}
