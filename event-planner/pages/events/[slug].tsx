import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { getEventById } from 'data'

const EventDetail: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query

  console.log(typeof slug)
  console.log(getEventById(slug))

  return <div>EventDetail</div>
}

export default EventDetail
