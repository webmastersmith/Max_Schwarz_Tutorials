import type { NextPage } from 'next'
import { getFireStoreFeaturedEvents, EventsType } from 'data'
import { EventCards } from 'components'

interface AppProps {
  events: EventsType[]
}

const HomePage = ({ events }: AppProps) => {
  // featured events
  return (
    <div className="container">
      <EventCards events={events} />
    </div>
  )
}

export default HomePage

export async function getStaticProps() {
  const events = await getFireStoreFeaturedEvents()
  return {
    props: {
      events,
    },
  }
}
