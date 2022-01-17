/* eslint-disable jsx-a11y/no-redundant-roles */
import { Data } from 'components'
import { MeetupCard } from 'pages'
import styles from './MeetupCard.module.scss'

export const MeetupList = ({ meetups }: { meetups: Data[] }): JSX.Element => {
  return (
    <ul role="list" className={styles.container}>
      {meetups.map((meetup: Data) => {
        return <MeetupItem meetup={meetup} key={meetup.id} />
      })}
    </ul>
  )
}

export const MeetupItem = ({
  meetup: { title, address, description, image },
}: {
  meetup: Data
}): JSX.Element => {
  return (
    <MeetupCard>
      <li>
        <img src={image} alt={title} />
        <div className={styles.bottom}>
          <div>
            <h3>{title}</h3>
            <address>{address}</address>
            <p>{description}</p>
          </div>
          <div className={styles.button}>
            <button>Save to Favorites</button>
          </div>
        </div>
      </li>
    </MeetupCard>
  )
}
