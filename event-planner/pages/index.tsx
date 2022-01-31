import type { NextPage } from 'next'
import Head from 'next/head'
import { getFireStoreFeaturedEvents, EventsType } from 'data'
import { EventCards } from 'components'
import { Button } from 'ui'
import styles from 'styles/homePage.module.scss'

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
      <h1 className={styles.h1}>Sign up to stay updated!</h1>
      <div className={styles.inputContainerDiv}>
        <input type="text" placeholder="Your Email" className={styles.input} />
        <Button type="button" classes={styles.button}>
          Register
        </Button>
      </div>

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
