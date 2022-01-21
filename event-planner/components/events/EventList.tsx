import Link from 'next/link'
import { EventsType } from 'data'
import Image from 'next/image'
import styles from './EventList.module.scss'

interface AppProps {
  events: EventsType[]
}

export const EventList = ({ events }: AppProps): JSX.Element => {
  return (
    <ul role="list" className={styles.eventList}>
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
                <div>
                  <time>{humanReadableDate}</time>
                </div>
                <div>
                  <address>{location.replace(', ', '\n')}</address>
                </div>
              </div>

              <div className={styles.eventLink}>
                <Link href={`/events/${id}`}>Explore Event</Link>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
