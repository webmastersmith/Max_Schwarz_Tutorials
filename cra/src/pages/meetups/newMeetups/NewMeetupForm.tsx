import { FC, FormEvent } from 'react'
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

  interface SubmitData {
    title: HTMLInputElement
    image: HTMLInputElement
    address: HTMLInputElement
    description: HTMLInputElement
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    // each item will be html node.
    const { title, image, address, description } = e.target as typeof e.target &
      SubmitData
    console.log({
      title: title.value,
      image: image.value,
      address: address.value,
      description: description.value,
    })
  }
  return (
    <MeetupCard>
      <form className={styles.form} onSubmit={handleSubmit}>
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
