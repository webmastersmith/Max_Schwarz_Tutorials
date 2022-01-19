import { FC, useContext } from 'react'
// import { DUMMY_DATA } from 'components'
import { FavoritesContext } from 'store'
import { MeetupCard } from 'pages'

export const AllMeetUpsPage: FC<{}> = (): JSX.Element => {
  const { data } = useContext(FavoritesContext)
  return (
    <div>
      <MeetupCard meetups={data} />
    </div>
  )
}
