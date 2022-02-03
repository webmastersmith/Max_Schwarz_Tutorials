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
  const [stateComments, setStateComments] = useState<Comments[]>(comments)

  const printComments = (
    stateComments: Comments[]
  ): JSX.Element[] | JSX.Element => {
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
