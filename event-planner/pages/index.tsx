import type { NextPage } from 'next'
import styles from '../styles/HomePage.module.css'
import Link from 'next/link'
import { getAllEvents, EventsType } from 'data'
import { EventList } from 'components'

const HomePage: NextPage = () => {
  const events = getAllEvents()

  return (
    <div className={styles.container}>
      Hello Next World!
      <ul role="list">
        {events.map((event: EventsType) => {
          const { id } = event
          return <EventList event={event} key={id} />
        })}
      </ul>
    </div>
  )
}

export default HomePage
