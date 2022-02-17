import type { NextPage } from 'next'
import styles from './postDetailHeader.module.scss'
import Image from 'next/image'
import { PostType } from 'types'

export const PostDetailHeader: NextPage<PostType> = ({ post }): JSX.Element => {
  const { title, image, slug } = post
  const imagePath = `/images/posts/${image}`
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <Image src={imagePath} alt={title} width={200} height={150} priority />
    </header>
  )
}
