import { EventsType } from 'data'
import styles from './EventDetail.module.scss'
import { EventCard } from './EventCard'

interface AppProps {
  event: EventsType
}

export const EventDetail = ({ event }: AppProps): JSX.Element => {
  const { title, date, description, id, image, isFeatured, location } = event
  const fixedDate = new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    day: '2-digit',
    month: 'long',
  })
  return (
    <div className={styles.container}>
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
