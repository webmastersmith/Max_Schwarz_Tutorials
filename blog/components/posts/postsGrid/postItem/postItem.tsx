import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from './postItem.module.scss'
import { PostTypes } from 'types'

interface Props {
  post: PostTypes
}

export const PostItem: NextPage<Props> = ({ post }): JSX.Element => {
  // console.log('PostItem', post.date)
  if (!post.date) return <p>No post found.</p>
  // console.log('PostItem', post)
  const { date, title, image, excerpt, slug } = post
  const formattedDate = new Date(date).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return (
    <li className={styles.post}>
      <Link href={`/posts/${slug}`}>
        <a>
          <div className={styles.image}>
            <Image
              src={`/images/posts/${slug}/${image}`}
              alt={title}
              width={300}
              height={200}
              layout="responsive"
              priority
            />
          </div>

          <div className={styles.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  )
}
