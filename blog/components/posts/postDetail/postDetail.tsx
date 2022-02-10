import type { NextPage } from 'next'
import styles from './postDetail.module.scss'
import { PostDetailHeader } from './postDetailHeader'
import { MDXRemote } from 'next-mdx-remote'

interface Props {
  title: string
  image: string
  content: any
}

export const PostDetail: NextPage<Props> = ({
  title,
  image,
  content,
}): JSX.Element => {
  // console.log('MDXRemote', <MDXRemote {...content} />)

  return (
    <article className={styles.content}>
      <PostDetailHeader title={title} image={image} />
      <MDXRemote {...content} />
    </article>
  )
}
