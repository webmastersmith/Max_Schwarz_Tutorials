import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const FilteredEvents: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query
  console.log(slug)

  return <div>FilteredEvents Slug</div>
}

export default FilteredEvents
