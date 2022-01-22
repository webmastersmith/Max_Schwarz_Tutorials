import Link from 'next/link'
import { EventsType } from 'data'
import Image from 'next/image'
import styles from './EventCard.module.scss'
import { Button, DateIcon, AddressIcon, ArrowRightIcon } from 'ui'

interface AppProps {
  events: EventsType[]
}

export const EventCard = ({ events }: AppProps): JSX.Element => {
  return (
    <ul role="list" className={styles.eventCard}>
      {events.map((event: EventsType) => {
        const { id, image, title, date, location } = event
        const humanReadableDate = new Date(date).toLocaleString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
        return (
          <li key={id} className={styles.eventItem}>
            <div className={styles.eventImage}>
              <Image src={'/' + image} alt={title} layout="fill" />
            </div>

            <div className={styles.eventText}>
              <div>
                <h2>{title}</h2>
                <div className={`${styles.icon} ${styles.date}`}>
                  <DateIcon />
                  <time>{humanReadableDate}</time>
                </div>
                <div className={styles.icon}>
                  <AddressIcon />
                  <address>{location.replace(', ', '\n')}</address>
                </div>
              </div>

              <div className={styles.eventButton}>
                <Button href={`/events/${id}`}>
                  <span className={styles.buttonIcon}>
                    Explore Event
                    <span>
                      <ArrowRightIcon />
                    </span>
                  </span>
                </Button>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}