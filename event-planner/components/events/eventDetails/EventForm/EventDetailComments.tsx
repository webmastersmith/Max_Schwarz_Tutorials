import type { NextPage, GetStaticProps } from 'next'
import { useState } from 'react'
import { EventDetailCommentsForm } from './EventDetailCommentsForm'
import styles from './EventDetailComments.module.scss'

interface AppProps {
  id: string
  showForm: boolean
  comments: Comments[]
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
  comments,
}): JSX.Element => {
  console.log('comments^', comments)

  const [stateComments, setStateComments] = useState<Comments[]>(comments)

  const printComments = (comments: Comments[]): JSX.Element[] | JSX.Element => {
    if (!stateComments.length)
      return <p key={'noComment'}>Be the first to add a comment!</p>

    return stateComments.map(({ id, email, name, date, comment }: Comments) => {
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
      <EventDetailCommentsForm id={id} setStateComments={setStateComments} />
      {printComments(stateComments)}
    </div>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const eventKeys: string[] = await getAllEventKeys()
//   console.log('keys', eventKeys)

//   const paths = eventKeys.map((key: string) => {
//     return {
//       params: { slug: key }, //this is dynamic page name with array of possible page names.
//     }
//   })
//   console.log('path', paths)

//   return {
//     paths,
//     fallback: false,
//   }
// }

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
