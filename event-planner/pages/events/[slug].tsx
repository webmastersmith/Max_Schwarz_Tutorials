import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { getEventById, EventsType } from 'data'
import { EventDetail } from 'components'

const EventDetailPage: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query

  const event = getEventById(slug as string)

  if (event) {
    return <EventDetail event={event} />
  }
  return <p>no event found</p>
}

export default EventDetailPage
