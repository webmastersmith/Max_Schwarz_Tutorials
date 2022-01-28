import type { NextPage } from 'next'
import Head from 'next/head'
import { getFireStoreFeaturedEvents, EventsType } from 'data'
import { EventCards } from 'components'

interface AppProps {
  events: EventsType[]
}

const HomePage: NextPage<AppProps> = ({ events }) => {
  // featured events
  return (
    <div className="container">
      {/* <Head>  anywhere in JSX  //only for index.tsx page if put here. */}
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
      <EventCards events={events} />
    </div>
  )
}

export default HomePage

export async function getStaticProps() {
  const events = await getFireStoreFeaturedEvents()
  return {
    props: {
      events,
    },
  }
}
