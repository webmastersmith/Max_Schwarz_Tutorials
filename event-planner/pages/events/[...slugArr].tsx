import type { NextPage, GetServerSideProps } from 'next'
import { EventsType, getFilteredFireStoreEvents } from 'data'
import { EventCards } from 'components'
import { Button } from 'ui'
import { ParsedUrlQuery } from 'querystring'

interface AppProps {
  events: EventsType[]
}
const FilteredEvents: NextPage<AppProps> = ({ events }) => {
  if (!events.length) {
    return (
      <div className="container">
        <Button href="/events/AllEvents">Show All Events</Button>
        <p style={{ fontWeight: 'bold', fontSize: '3rem' }}>No events found</p>
      </div>
    )
  }

  return (
    <div className="container">
      <EventCards events={events} />
    </div>
  )
}

export default FilteredEvents

interface PropsType extends ParsedUrlQuery {
  slugArr: string[]
}
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { slugArr } = context.params as PropsType
  const [year, month] = slugArr

  const numYear = +year
  const numMonth = +month
  let events: EventsType[] = []

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        events,
      },
    }
  }

  events = await getFilteredFireStoreEvents(numYear, numMonth)

  return {
    props: {
      events,
    },
  }
}
