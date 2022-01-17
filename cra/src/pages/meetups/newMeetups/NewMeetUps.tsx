import { FC } from 'react'
import { NewMeetupForm } from './NewMeetupForm'

export const NewMeetUpsPage: FC = (): JSX.Element => {
  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm />
    </section>
  )
}
