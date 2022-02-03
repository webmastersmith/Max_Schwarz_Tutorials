import type { NextPage } from 'next'
import { useState } from 'react'
import { EventDetailCommentsForm } from './EventDetailCommentsForm'
// import { createCollection } from 'utils'
import { addDoc } from 'firebase/firestore'
import styles from './EventDetailComments.module.scss'

interface AppProps {
  id: string
  showForm: boolean
}
export interface Comments {
  email: string
  name: string
  comment: string
  date: string
  id: string
  pageId: string
}

export const EventDetailComments: NextPage<AppProps> = ({
  id,
  showForm,
}): JSX.Element => {
  const [comments, setComments] = useState<Comments[]>([])

  const printComments = (comments: Comments[]): JSX.Element[] | JSX.Element => {
    if (!comments.length)
      return <p key={'noComment'}>Be the first to add a comment!</p>

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
  }

  return (
    <div className={showForm ? 'none' : 'hide'}>
      <EventDetailCommentsForm id={id} />
      {printComments(comments)}
    </div>
  )
}

// const commentsCol = createCollection<Comments>(`${id}comments`)

// const getComments = useCallback(async (id: string) => {
// const querySnapshot = await getDocs(commentsCol)
// querySnapshot.forEach((doc) => {

//   const obj = doc.data()
//   console.log('obj', obj)
//   if (!comments.some((comment) => obj?.id === comment.id)) {
//     setComments((c) => [...c, obj])
//   }
// })
// }, [])

// useEffect(() => {
//   if (!comments.length) {
//     console.log('comments', comments)
//     getComments(id)
//   }
// }, [])
