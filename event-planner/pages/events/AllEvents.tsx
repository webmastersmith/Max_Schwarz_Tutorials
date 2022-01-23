import type { NextPage } from 'next'
import { getAllEvents } from 'data'
import { EventCards } from 'components'
import EventSearch from './EventSearch'

const AllEventsPage: NextPage = () => {
  const events = getAllEvents()
  return (
    <div className="container">
      <EventSearch />
      <EventCards events={events} />
    </div>
  )
}

export default AllEventsPage
