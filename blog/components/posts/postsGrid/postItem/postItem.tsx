import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from './postItem.module.scss'
import { PostType } from 'types'

export const PostItem: NextPage<PostType> = ({ post }): JSX.Element => {
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
              src={`/images/posts/${image}`}
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
