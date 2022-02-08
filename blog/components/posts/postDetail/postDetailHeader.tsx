import type { NextPage } from 'next'
import styles from './postDetailHeader.module.scss'
import Image from 'next/image'
import { PostTypes } from 'types'

interface Props {
  title: string
  image: string
}
export const PostDetailHeader: NextPage<Props> = ({
  title,
  image,
}): JSX.Element => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={200} height={150} priority />
    </header>
  )
}
