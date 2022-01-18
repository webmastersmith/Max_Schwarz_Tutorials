import { FC, FormEvent, useState, Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { MeetupCard } from 'pages'
import styles from './NewMeetupForm.module.scss'

interface FormData {
  id: string
  msg: string
  type: string
  required: boolean
  value: string
  fn: Dispatch<SetStateAction<string>>
}

export const NewMeetupForm: FC<{}> = (): JSX.Element => {
  const navigate = useNavigate()
  const [title, setTitle] = useState<string>('')
  const [image, setImage] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')

  const formData: FormData[] = [
    {
      id: 'title',
      msg: 'Meetup Title',
      type: 'text',
      required: true,
      value: title,
      fn: setTitle,
    },
    {
      id: 'image',
      msg: 'Meetup Image',
      type: 'url',
      required: true,
      value: image,
      fn: setImage,
    },
    {
      id: 'address',
      msg: 'Address',
      type: 'text',
      required: true,
      value: address,
      fn: setAddress,
    },
    {
      id: 'description',
      msg: 'Description',
      type: 'text',
      required: true,
      value: description,
      fn: setDescription,
    },
  ]

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    // each are html nodes
    console.log({
      title: title,
      image: image,
      address: address,
      description: description,
    })
    setTitle('')
    setImage('')
    setAddress('')
    setDescription('')
    navigate('/')
  }
  function handleChange(e: any, fn: Dispatch<SetStateAction<string>>): void {
    fn(e.target.value)
  }
  return (
    <MeetupCard>
      <form className={styles.form} onSubmit={handleSubmit}>
        {formData.map(
          ({ id, msg, type, required, value, fn }: FormData, i: number) => {
            return (
              <div key={id + i}>
                <label htmlFor={id}>{msg}</label>
                {
                  // prettier-ignore
                  (id === 'description') 
                  ? <textarea name={id} id={id} required={required} rows={5} onChange={(e) => handleChange(e, fn)} value={value}></textarea>
                  : <input type={type} name={id} id={id} required={required} onChange={(e) => handleChange(e, fn)} value={value} />
                }
              </div>
            )
          }
        )}
        <div>
          <button>Add Meetup</button>
        </div>
      </form>
    </MeetupCard>
  )
}
