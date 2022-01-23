import type { NextPage } from 'next'
import styles from '../styles/HomePage.module.css'
import { getFeaturedEvents } from 'data'
import { EventCards } from 'components'

const HomePage: NextPage = () => {
  // featured events
  const events = getFeaturedEvents()

  return (
    <div className={styles.container}>
      <EventCards events={events} />
    </div>
  )
}

export default HomePage
