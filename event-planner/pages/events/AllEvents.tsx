import { useRouter } from 'next/router'
import { getAllFireStoreEvents, EventsType, getAllEvents } from 'data'
import { EventCards } from 'components'
import EventSearch from './EventSearch'

interface AppProps {
  events: EventsType[]
}

const AllEventsPage = ({ events }: AppProps) => {
  const router = useRouter()

  const eventSearchFn = (year: string, month: string): void => {
    router.push(`/events/${year}/${month}`)
  }
  return (
    <div className="container">
      <EventSearch eventSearchFn={eventSearchFn} />
      <EventCards events={events} />
    </div>
  )
}

export default AllEventsPage

export async function getStaticProps() {
  const events = await getAllFireStoreEvents()
  return {
    props: {
      events,
    },
  }
}
