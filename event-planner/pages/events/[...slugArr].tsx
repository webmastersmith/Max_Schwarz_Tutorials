import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const FilteredEvents: NextPage = () => {
  const router = useRouter()
  const { slugArr } = router.query
  console.log(slugArr)

  return <div>FilteredEvents Slug</div>
}

export default FilteredEvents
