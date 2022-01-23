import type { NextPage } from 'next'
import { getAllEvents } from 'data'
import { EventCards } from 'components'

const AllEventsPage: NextPage = () => {
  const events = getAllEvents()
  return <EventCards events={events} />
}

export default AllEventsPage
