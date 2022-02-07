import type { NextPage } from 'next'
import styles from './postItem.module.scss'

interface Props {
  post: string
}

export const PostItem: NextPage<Props> = ({ post }): JSX.Element => {
  return <div>PostItem</div>
}
