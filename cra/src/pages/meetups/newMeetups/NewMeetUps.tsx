import { FC } from 'react'
import { NewMeetupForm } from './NewMeetupForm'
import styles from './NewMeetupForm.module.scss'

export const NewMeetUpsPage: FC = (): JSX.Element => {
  return (
    <section className={styles.formWrapper}>
      <div>
        <h1>Add New Meetup</h1>
        <NewMeetupForm />
      </div>
    </section>
  )
}
