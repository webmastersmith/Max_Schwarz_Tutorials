/* eslint-disable jsx-a11y/no-redundant-roles */
import { useContext } from 'react'
import { FavoritesContext } from 'store'
import { Data } from 'components'
import styles from './MeetupCard.module.scss'

export const MeetupCard = ({ meetups }: { meetups: Data[] }): JSX.Element => {
  return (
    <ul role="list" className={styles.container}>
      {meetups.map((meetup: Data) => {
        return <MeetupItem meetup={meetup} key={meetup.id} />
      })}
    </ul>
  )
}

const MeetupItem = ({ meetup }: { meetup: Data }): JSX.Element => {
  const { title, address, description, image, id } = meetup
  const { addFavorite, itemIsFavorite, removeFavorite } =
    useContext(FavoritesContext)
  return (
    <div className={styles.card}>
      <li>
        <img src={image} alt={title} width="100%" height="400px" />
        <div className={styles.bottom}>
          <div>
            <h3>{title}</h3>
            <address>{address}</address>
            <p>{description}</p>
          </div>
          <div className={styles.button}>
            <button
              onClick={() =>
                itemIsFavorite(id) ? removeFavorite(id) : addFavorite(meetup)
              }
            >
              {itemIsFavorite(id)
                ? 'Remove from Favorites'
                : 'Save to Favorites'}
            </button>
          </div>
        </div>
      </li>
    </div>
  )
}
