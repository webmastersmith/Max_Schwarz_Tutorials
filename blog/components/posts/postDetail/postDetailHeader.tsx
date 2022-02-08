import type { NextPage } from 'next'
import styles from './postDetailHeader.module.scss'

interface Props {
  data: string
}

export const PostDetailHeader: NextPage<Props> = (): JSX.Element => {
  return <div className={styles.header}>PostDetailHeader</div>
}
