import React from 'react'
import Image from 'next/image'
import { Button, DateIcon, AddressIcon, ArrowRightIcon } from 'ui'
import styles from './EventCard.module.scss'
import { EventsType } from 'data'

interface AppProps {
  event: EventsType
}

export const EventCard = ({ event }: AppProps): JSX.Element => {
  const { id, image, title, date, location } = event
  const humanReadableDate = new Date(date).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <li key={id} className={styles.eventItem}>
      <div className={styles.eventImage}>
        <Image
          src={'/' + image}
          alt={title}
          objectFit="cover"
          layout="fill"
          priority
        />
      </div>

      <div className={styles.eventText}>
        <div>
          <h2>{title}</h2>
          <div className={`${styles.icon} ${styles.date}`}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={styles.icon}>
            <AddressIcon />
            <address>{location.replace(', ', '\n')}</address>
          </div>
        </div>

        <div className={styles.eventButton}>
          <Button href={`/events/${id}`}>
            <span className={styles.buttonIcon}>
              Explore Event
              <span>
                <ArrowRightIcon />
              </span>
            </span>
          </Button>
        </div>
      </div>
    </li>
  )
}
