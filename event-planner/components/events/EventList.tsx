import { EventsType } from 'data'
import Image from 'next/image'

interface AppProps {
  event: EventsType
}

export const EventList = (props: AppProps): JSX.Element => {
  const { image, title } = props.event
  // console.log(events)

  return (
    <li>
      <Image src={image} alt={title} width={600} height={300} />
    </li>
  )
}
