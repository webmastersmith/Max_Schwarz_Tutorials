import type { NextPage } from 'next'
import classes from './notify.module.scss'
import { RootState, reset } from 'reduxToolkit'
import { useSelector, useDispatch } from 'react-redux'

interface AppProps {
  title: string
  msg: string
}

export const Notify: NextPage<AppProps> = ({ title, msg }): JSX.Element => {
  const status = useSelector((state: RootState) => state.notify.status)
  const dispatch = useDispatch()

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

  const activeClasses = `${classes.notification} ${statusClasses}`

  return (
    <div className={activeClasses} onClick={() => dispatch(reset())}>
      <h2>{title}</h2>
      <p>{msg}</p>
    </div>
  )
}
