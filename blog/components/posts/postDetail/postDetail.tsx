import type { NextPage } from 'next'
import { useMemo } from 'react'
import { PostType } from 'types'
import styles from './postDetail.module.scss'
import { PostDetailHeader } from './postDetailHeader'
import { getMDXComponent } from 'mdx-bundler/client'

interface Props {
  post: PostType
}

export const PostDetail: NextPage<Props> = ({ post }): JSX.Element => {
  const { title, image, code, slug } = post
  const imagePath = `/images/posts/${slug}/${image}`
  const MDX = useMemo(() => getMDXComponent(code), [code])

  return (
    <article className={styles.content}>
      <PostDetailHeader title={title} image={imagePath} />
      <MDX />
    </article>
  )
}
