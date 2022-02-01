import { EventsType } from 'data'
import styles from './EventDetailPage.module.scss'
import { EventCard } from './EventCard'
import { EventDetailComments } from './EventForm'
import Head from 'next/head'
import { Button } from 'ui'
import { useState } from 'react'

interface AppProps {
  event: EventsType
}

export const EventDetail = ({ event }: AppProps): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(true)

  const { title, date, description, image, location, id } = event
  const fixedDate = new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    day: '2-digit',
    month: 'long',
  })
  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <h1 className={styles.h1}>{title}</h1>

      <EventCard
        image={image}
        location={location}
        title={title}
        date={fixedDate}
      />

      <p className={styles.description}>{description}</p>

      <Button
        type="button"
        classes={styles.button}
        click={() => setShowForm((x) => !x)}
      >
        {`${!showForm ? 'Show' : 'Hide'} Comments`}
      </Button>

      {showForm && <EventDetailComments id={id} />}
    </div>
  )
}
