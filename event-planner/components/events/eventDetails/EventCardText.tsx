import { AddressIcon, DateIcon } from 'ui'
import styles from './EventCardText.module.scss'

interface AppProps {
  date: string
  location: string
}

export const EventText = ({ date, location }: AppProps): JSX.Element => {
  return (
    <div className={styles.cardText}>
      <div className={styles.date}>
        <div className={styles.icon}>
          <DateIcon />
        </div>
        {date}
      </div>

      <div style={{ whiteSpace: 'pre' }}>
        <div className={styles.icon}>
          <AddressIcon />
        </div>
        {location.replace(', ', '\n')}
      </div>
    </div>
  )
}
