import type { NextPage } from 'next'
// import styles from './FeaturedPosts.module.scss'

interface AppProps {
  data: string
}

export const FeaturedPosts: NextPage<AppProps> = ({ data }): JSX.Element => {
  return <div>FeaturedPosts</div>
}
