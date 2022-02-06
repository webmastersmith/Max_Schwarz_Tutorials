import type { NextPage } from 'next'
import { useEffect } from 'react'
import classes from './notify.module.scss'
import { RootState, reset } from 'reduxToolkit'
import { useSelector, useDispatch } from 'react-redux'

// interface AppProps {
//   title: string
//   msg: string
//   status
// }

export const Notify: NextPage = (): JSX.Element => {
  const { title, msg, status } = useSelector((state: RootState) => state.notify)
  const dispatch = useDispatch()
  // console.log('title', title)
  // console.log('msg', msg)
  // console.log('status', status)

  // remove notify banner after 3 seconds.
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => dispatch(reset()), 3000)
      return () => clearTimeout(timer)
    }
  }, [status])

  let statusClasses = ''

  if (status === 'success') {
    statusClasses = classes.success
  }

  if (status === 'error') {
    statusClasses = classes.error
  }

  if (status === 'pending') {
    statusClasses = classes.pending
  }

  if (status === 'hide') {
    statusClasses = 'hide'
  }

  const activeClasses = `${classes.notification} ${statusClasses}`

  return (
    <div className={activeClasses} onClick={() => dispatch(reset())}>
      <h2>{title}</h2>
      <p>{msg}</p>
    </div>
  )
}
