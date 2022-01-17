import { FC } from 'react'
import { DUMMY_DATA } from 'components'
import { MeetupList } from 'pages'

export const AllMeetUpsPage: FC<{}> = (): JSX.Element => {
  return (
    <div>
      <MeetupList meetups={DUMMY_DATA} />
    </div>
  )
}
