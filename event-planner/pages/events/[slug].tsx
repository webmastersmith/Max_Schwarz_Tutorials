import {
  EventsType,
  getFireStoreEventById,
  getFireStoreFeaturedEvents,
} from 'data'
import { EventDetail } from 'components'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface AppProps {
  event: EventsType
}

const EventDetailPage: NextPage<AppProps> = ({ event }): JSX.Element => {
  if (!event) {
    return <p>Loading...</p>
  }

  if (!event.id) {
    return <p>no event found</p>
  }
  return <EventDetail event={event} />
}

export default EventDetailPage

interface PropsType extends ParsedUrlQuery {
  slug: string
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as PropsType
  const event = await getFireStoreEventById(slug)

  return {
    props: {
      event,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events: EventsType[] = await getFireStoreFeaturedEvents()
  const paths = events.map((event: EventsType) => {
    const { id } = event
    return {
      params: { slug: id }, //this is dynamic page name with array of possible page names.
    }
  })

  return {
    paths,
    fallback: true,
  }
}
