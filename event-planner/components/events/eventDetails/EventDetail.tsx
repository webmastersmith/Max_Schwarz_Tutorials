import { EventsType } from 'data'
import styles from './EventDetail.module.scss'
import { EventCard } from './EventCard'
import Head from 'next/head'

interface AppProps {
  event: EventsType
}

export const EventDetail = ({ event }: AppProps): JSX.Element => {
  const { title, date, description, image, location } = event
  const fixedDate = new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    day: '2-digit',
    month: 'long',
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <h1 className={styles.title}>{title}</h1>

      <EventCard
        image={image}
        location={location}
        title={title}
        date={fixedDate}
      />

      <p className={styles.description}>{description}</p>
    </div>
  )
}
