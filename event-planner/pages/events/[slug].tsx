import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const EventDetail: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query
  console.log(slug)

  return <div>EventDetail</div>
}

export default EventDetail
