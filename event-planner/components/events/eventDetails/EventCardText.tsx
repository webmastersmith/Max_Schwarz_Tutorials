import { AddressIcon, DateIcon } from 'ui'
import styles from './EventCardText.module.scss'
import classes from './EventCard.module.scss'

interface AppProps {
  date: string
  location: string
}

export const EventText = ({ date, location }: AppProps): JSX.Element => {
  return (
    <div className={styles.cardText}>
      <div>
        <div className={classes.icon}>
          <DateIcon />
        </div>
        {date}
      </div>
      <div style={{ whiteSpace: 'pre' }}>
        <div className={classes.icon}>
          <AddressIcon />
        </div>
        {location.replace(', ', '\n')}
      </div>
    </div>
  )
}
