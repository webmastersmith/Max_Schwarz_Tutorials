import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { getFilteredEvents } from 'data'
import { EventCards } from 'components'
import { Button } from 'ui'

const FilteredEvents: NextPage = () => {
  const router = useRouter()
  const { slugArr } = router.query

  if (!slugArr) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    )
  }
  const [year, month] = slugArr as string[]
  console.log(slugArr)

  const noEvents = (
    <div className="container">
      <Button href="/events">Show All Events</Button>
      <p style={{ fontWeight: 'bold', fontSize: '3rem' }}>No events found</p>
    </div>
  )
  const numYear = +year
  const numMonth = +month
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return noEvents
  }

  const events = getFilteredEvents(numYear, numMonth)
  if (!events.length) {
    return noEvents
  }

  return (
    <div className="container">
      <EventCards events={events} />
    </div>
  )
}

export default FilteredEvents
