import { useRef, Dispatch, SetStateAction, memo, useCallback } from 'react'
import type { NextPage } from 'next'
import { Button } from 'ui'
import { Comments } from './EventDetailComments'
import styles from './EventDetailCommentsForm.module.scss'
import { message } from 'reduxToolkit'
import { useDispatch } from 'react-redux'
import { Notify } from 'components'

interface AppProps {
  id: string
  setStateComments: Dispatch<SetStateAction<Comments[]>>
}

const CommentsForm: NextPage<AppProps> = ({
  id,
  setStateComments,
}): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null)
  const dispatch = useDispatch()

  const handleSubmit: React.FormEventHandler = useCallback(
    async (event): Promise<void> => {
      event.preventDefault()
      // set status to pending
      dispatch(
        message({
          title: 'Sending',
          msg: 'Comment is sending...',
          status: 'pending',
        })
      )

      const formData = new FormData(event.target as HTMLFormElement)
      const dataObject: unknown = Object.fromEntries(formData)
      const commentObject = {
        ...(dataObject as Comments), //{email, name, comment}
        id: crypto.randomUUID?.() ?? `${Date.now()}`,
        pageId: id,
      }

      let data
      try {
        const response = await fetch(
          `http://localhost:3000/api/comments/${id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentObject),
          }
        )
        data = await response.json()
        if (response.ok) {
          dispatch(
            message({
              title: 'Success!',
              msg: data.msg,
              status: 'success',
            })
          )
          setStateComments((c) => [...c, commentObject])
          console.log('form data', data)
          formRef.current?.reset()
        } else {
          throw new Error()
        }
      } catch (e) {
        dispatch(
          message({
            title: 'Error',
            msg: data.msg,
            status: 'error',
          })
        )
        console.log(data)
      }
    },
    []
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
      <Notify />
    </form>
  )
}
export const EventDetailCommentsForm = memo(CommentsForm)
