import type { NextPage } from 'next'
import { useRef } from 'react'
import { Button } from 'ui'
import styles from './EventDetailCommentsForm.module.scss'
import { FormEventHandler } from 'react'

// interface AppProps {
//   id: string
// }

export const EventDetailCommentsForm: NextPage = (): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit: React.FormEventHandler = (event): void => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const dataObject = Object.fromEntries(formData)
    console.log('dataObject', dataObject)
    formRef.current?.reset()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
      <div className={styles.emailNameDiv}>
        <div className={styles.email}>
          <label htmlFor="email">Your Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div className={styles.name}>
          <label htmlFor="name">Your Name</label>
          <input type="text" name="name" id="name" required />
        </div>
      </div>

      <div className={styles.commentsDiv}>
        <label htmlFor="comments">Your Comments</label>
        <textarea name="comments" id="comments" rows={5} required />
      </div>
      <Button classes={styles.button} type="submit">
        Submit
      </Button>
    </form>
  )
}
