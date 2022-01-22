import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { getEventById, EventsType } from 'data'

const EventDetail: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query

  if (slug) {
    console.log(getEventById(slug))
  }
  console.log(typeof slug)

  return <div>EventDetail</div>
}

export default EventDetail
