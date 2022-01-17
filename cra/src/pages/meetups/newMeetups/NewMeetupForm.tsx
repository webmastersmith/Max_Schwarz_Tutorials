import { FC } from 'react'
import { MeetupCard } from 'pages'
import styles from './NewMeetupForm.module.scss'

interface FormData {
  id: string
  msg: string
  type: string
  required: boolean
}

export const NewMeetupForm: FC<{}> = (): JSX.Element => {
  const formData: FormData[] = [
    { id: 'title', msg: 'Meetup Title', type: 'text', required: true },
    { id: 'image', msg: 'Meetup Image', type: 'url', required: true },
    { id: 'address', msg: 'Address', type: 'text', required: true },
    { id: 'description', msg: 'Description', type: 'text', required: true },
  ]
  return (
    <MeetupCard>
      <form className={styles.form}>
        {formData.map(({ id, msg, type, required }: FormData) => {
          return (
            <div>
              <label htmlFor={id}>{msg}</label>
              {
                // prettier-ignore
                (id === 'description') 
                  ? <textarea name={id} id={id} required={required} rows={5}></textarea>
                  : <input type={type} name={id} id={id} required={required} />
              }
            </div>
          )
        })}
        <div>
          <button>Add Meetup</button>
        </div>
      </form>
    </MeetupCard>
  )
}
