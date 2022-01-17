import { FC } from 'react'
import styles from './MeetupCard.module.scss'

export const MeetupCard: FC = ({ children }): JSX.Element => {
  return <div className={styles.card}>{children}</div>
}
