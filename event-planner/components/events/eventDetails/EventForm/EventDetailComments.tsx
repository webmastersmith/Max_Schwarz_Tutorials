import type { NextPage } from 'next'
import { useState, useEffect, useCallback, memo } from 'react'
import { EventDetailCommentsForm } from './EventDetailCommentsForm'
import { createCollection } from 'utils'
import { getDocs, addDoc } from 'firebase/firestore'
import styles from './EventDetailComments.module.scss'

interface AppProps {
  id: string
  showForm: boolean
}
export interface Comments {
  email: string
  name: string
  comment: string
  date: number
  id: string
}

const AllComments: NextPage<AppProps> = ({ id, showForm }): JSX.Element => {
  const [comments, setComments] = useState<Comments[]>([])
  const commentsCol = createCollection<Comments>(`${id}comments`)
  const getComments = useCallback(async (id: string) => {
    const querySnapshot = await getDocs(commentsCol)
    querySnapshot.forEach((doc) => {
      const obj = doc.data()
      console.log('obj', obj)
      if (!comments.some((comment) => obj?.id === comment.id)) {
        setComments((c) => [...c, obj])
      }
    })
  }, [])

  useEffect(() => {
    if (!comments.length) {
      console.log('comments', comments)
      getComments(id)
    }
  }, [])

  const printComments = useCallback((comments: Comments[]): JSX.Element[] => {
    return comments.map(({ id, email, name, date, comment }: Comments) => {
      return (
        <div key={id}>
          <div className={styles.comment}>
            <span>{comment}</span>
            <span>By {name}</span>
          </div>
        </div>
      )
    })
  }, [])

  return (
    <div className={showForm ? 'none' : 'hide'}>
      <EventDetailCommentsForm
        id={id}
        setComments={setComments}
        addDoc={addDoc}
      />
      {!!comments.length && printComments(comments)}
    </div>
  )
}

export const EventDetailComments = memo(AllComments)
