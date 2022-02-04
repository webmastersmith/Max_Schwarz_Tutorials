import type { NextPage } from 'next'
import Link from 'next/link'
import styles from './EventCard.module.scss'
import { EventCard } from 'components'
import { EventsType } from 'data'

interface AppProps {
  events: EventsType[]
}

export const EventCards: NextPage<AppProps> = ({ events }): JSX.Element => {
  return (
    <ul role="list" className={styles.eventCard}>
      {events.map((event: EventsType) => {
        return <EventCard event={event} key={event.id} />
      })}
    </ul>
  )
}
