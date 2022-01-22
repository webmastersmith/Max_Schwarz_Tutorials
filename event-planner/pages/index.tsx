import type { NextPage } from 'next'
import styles from '../styles/HomePage.module.css'
import { getAllEvents } from 'data'
import { EventCard } from 'components'

const HomePage: NextPage = () => {
  const events = getAllEvents()

  return (
    <div className={styles.container}>
      <EventCard events={events} />
    </div>
  )
}

export default HomePage
