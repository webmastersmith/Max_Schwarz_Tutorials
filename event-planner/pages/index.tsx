import type { NextPage } from 'next'
import { getFeaturedEvents } from 'data'
import { EventCards } from 'components'

const HomePage: NextPage = () => {
  // featured events
  const events = getFeaturedEvents()

  return (
    <div className="container">
      <EventCards events={events} />
    </div>
  )
}

export default HomePage
