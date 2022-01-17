/* eslint-disable jsx-a11y/no-redundant-roles */
import { Data } from 'components'

export const MeetupList = ({ meetups }: { meetups: Data[] }): JSX.Element => {
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <ul role="list">
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
    <li>
      {/* <div>
    <img src={image} alt={title} />
  </div> */}
      <div>
        <h3>{title}</h3>
        <address>{address}</address>
        <p>{description}</p>
      </div>
      <div>
        <button>Save to Favorites</button>
      </div>
    </li>
  )
}
