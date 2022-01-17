import { FC } from 'react'
import { Data } from 'components'

export const MeetupList: FC<{ items: Data[] }> = ({ items }): JSX.Element => {
  return (
    <ul role="list">
      {items.map((data: Data) => {
        return meetupItem(data)
      })}
    </ul>
  )
}

export const meetupItem: FC<Data> = ({
  id,
  title,
  address,
  description,
  image,
}): JSX.Element => {
  return (
    <li key={id}>
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
