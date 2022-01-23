import type { NextPage } from 'next'
import { getAllEvents } from 'data'
import { EventCards } from 'components'

const AllEventsPage: NextPage = () => {
  const events = getAllEvents()
  return (
    <div className="container">
      <EventCards events={events} />
    </div>
  )
}

export default AllEventsPage
