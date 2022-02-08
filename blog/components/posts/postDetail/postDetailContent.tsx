import type { NextPage } from 'next'
import styles from './postDetailContent.module.scss'

interface Props {
  data: string
}

export const PostDetailContent: NextPage<Props> = (): JSX.Element => {
  return <div className={styles.content}>PostDetailContent</div>
}
