import Link from 'next/link'
import { EventsType } from 'data'
import Image from 'next/image'
import styles from './EventList.module.scss'

interface AppProps {
  events: EventsType[]
}

export const EventList = ({ events }: AppProps): JSX.Element => {
  return (
    <ul role="list">
      {events.map((event: EventsType) => {
        const { id, image, title, date, location } = event
        const humanReadableDate = new Date(date).toLocaleString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
        return (
          <li key={id} className={styles.eventList}>
            <div className={styles.eventImage}>
              <Image
                src={'/' + image}
                alt={title}
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div>
              <div>
                <h2>{title}</h2>
                <div>
                  <time>{humanReadableDate}</time>
                </div>
                <div>
                  <address>{location.replace(', ', '\n')}</address>
                </div>
              </div>
              <div>
                <Link href={`/events/${id}`}>Explore Event</Link>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
