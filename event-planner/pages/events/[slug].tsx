import {
  EventsType,
  getFireStoreEventById,
  getFireStoreFeaturedEvents,
} from 'data'
import { EventDetail } from 'components'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { getPageComments } from 'utils'
import { Comments } from 'components'

interface AppProps {
  event: EventsType
  comments: Comments[]
}

const EventDetailPage: NextPage<AppProps> = ({
  event,
  comments,
}): JSX.Element => {
  if (!event) {
    return <p>Loading...</p>
  }

  if (!event.id) {
    return <p>no event found</p>
  }
  return <EventDetail event={event} comments={comments} />
}

export default EventDetailPage

// next server-side code.
interface PropsType extends ParsedUrlQuery {
  slug: string
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as PropsType
  const event = await getFireStoreEventById(slug)
  const comments = await getPageComments(slug)

  return {
    props: {
      event,
      comments,
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
