import type { NextPage } from 'next'
import { useMemo } from 'react'
import styles from './postDetail.module.scss'
import { PostDetailHeader } from './postDetailHeader'
// import ReactMarkdown from 'react-markdown'
import { getMDXComponent } from 'mdx-bundler/client'

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
  const Component = useMemo(() => getMDXComponent(content), [content])
  return (
    <article className={styles.content}>
      <PostDetailHeader title={title} image={image} />
      <Component />
    </article>
  )
}
