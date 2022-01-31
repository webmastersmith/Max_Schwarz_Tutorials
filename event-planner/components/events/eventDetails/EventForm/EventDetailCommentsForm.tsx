import type { NextPage } from 'next'
import styles from './EventDetailCommentsForm.module.scss'

interface AppProps {
  data: string
}

export const EventDetailCommentsForm: NextPage<AppProps> = ({
  data,
}): JSX.Element => {
  return <form className={styles.form}>EventDetailCommentsForm</form>
}
