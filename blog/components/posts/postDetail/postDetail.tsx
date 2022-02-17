import type { NextPage } from 'next'
import Image from 'next/image'
import { PostType } from 'types'
import styles from './postDetail.module.scss'
import { PostDetailHeader } from './postDetailHeader'
import { MDX, Youtube } from 'components'

export const PostDetail: NextPage<PostType> = ({ post }): JSX.Element => {
  return (
    <article className={styles.content}>
      <PostDetailHeader post={post} />
      <MDX post={post} components={{ Image, Youtube }} />
    </article>
  )
}
