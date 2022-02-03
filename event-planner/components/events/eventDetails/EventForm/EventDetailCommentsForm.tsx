import { useRef, Dispatch, SetStateAction, memo, useCallback } from 'react'
import type { NextPage } from 'next'
import { collection } from 'firebase/firestore'
import { db } from 'utils'
import { Button } from 'ui'
import { Comments } from './EventDetailComments'
import styles from './EventDetailCommentsForm.module.scss'

interface AppProps {
  id: string
  // setComments: Dispatch<SetStateAction<Comments[]>>
}

const CommentsForm: NextPage<AppProps> = ({ id }): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit: React.FormEventHandler = useCallback(
    async (event): Promise<void> => {
      event.preventDefault()
      const formData = new FormData(event.target as HTMLFormElement)
      const dataObject: unknown = Object.fromEntries(formData)

      const commentObject = {
        ...(dataObject as Comments),
        date: new Date().toISOString(),
        id: crypto.randomUUID?.() ?? `${Date.now()}`,
        pageId: id,
      }

      const response = await fetch(`http://localhost:3000/api/comments/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentObject),
      })
      const data = await response.json()
      console.log(data)

      // addDoc(collection(db, `${id}comments`), commentObject)
      // setComments((c: Comments[]) => [...c, commentObject])
      // formRef.current?.reset()
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
