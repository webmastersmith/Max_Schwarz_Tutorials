import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { getEventById, EventsType } from 'data'
import { EventCard } from 'components'

const EventDetail: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query

  const event = getEventById(slug as string)

  return <EventCard event={event} />
}

export default EventDetail
