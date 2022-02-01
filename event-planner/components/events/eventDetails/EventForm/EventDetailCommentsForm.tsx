import { useRef, Dispatch, SetStateAction, memo, useCallback } from 'react'
import type { NextPage } from 'next'
import { collection } from 'firebase/firestore'
import { db } from 'utils'
import { Button } from 'ui'
import { Comments } from './EventDetailComments'
import styles from './EventDetailCommentsForm.module.scss'

interface AppProps {
  id: string
  setComments: Dispatch<SetStateAction<Comments[]>>
  addDoc: any
}

const CommentsForm: NextPage<AppProps> = ({
  id,
  setComments,
  addDoc,
}): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit: React.FormEventHandler = useCallback(
    (event): void => {
      event.preventDefault()
      const formData = new FormData(event.target as HTMLFormElement)
      const dataObject: unknown = Object.fromEntries(formData)

      const commentObject = {
        ...(dataObject as Comments),
        date: Date.now(),
        id: crypto.randomUUID?.() ?? `${Date.now()}`,
      }
      addDoc(collection(db, `${id}comments`), commentObject)
      setComments((c: Comments[]) => [...c, commentObject])
      formRef.current?.reset()
    },
    [id]
  )

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
        <label htmlFor="comment">Your Comments</label>
        <textarea name="comment" id="comment" rows={5} required />
      </div>
      <Button classes={styles.button} type="submit">
        Submit
      </Button>
    </form>
  )
}
export const EventDetailCommentsForm = memo(CommentsForm)
