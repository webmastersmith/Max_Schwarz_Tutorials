import type { NextPage } from 'next'
import styles from './featuredPosts.module.scss'

//interface Props {
//data: string
//}

//export const FeaturedPosts: NextPage<Props> = ({data}): JSX.Element => {
export const FeaturedPosts: NextPage = (): JSX.Element => {
  return (
    <section className={styles.latest}>
      <h2>Featured Posts</h2>
    </section>
  )
}
