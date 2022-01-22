import { EventsType } from 'data'
import styles from './EventDetail.module.scss'
import { AddressIcon, DateIcon } from 'ui'
import Image from 'next/image'

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
      <div className={styles.card}>
        <div className={styles.cardImage}>
          <Image src={'/' + image} alt={title} layout="fill" />
        </div>
        <div className={styles.cardText}>
          <div>
            <div className={styles.icon}>
              <DateIcon />
            </div>
            {fixedDate}
          </div>
          <div>
            <div className={styles.icon}>
              <AddressIcon />
            </div>
            {AddressIcon}
          </div>
        </div>
      </div>

      <p className={styles.description}>{description}</p>
    </div>
  )
}
