import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { getAllEvents } from 'data'
import { EventCards } from 'components'
import EventSearch from './EventSearch'

const AllEventsPage: NextPage = () => {
  const router = useRouter()
  const events = getAllEvents()

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
