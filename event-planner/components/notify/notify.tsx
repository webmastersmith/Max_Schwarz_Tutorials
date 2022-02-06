import type { NextPage } from 'next'
import classes from './notify.module.scss'
import { RootState, message } from 'reduxToolkit'
import { useSelector, useDispatch } from 'react-redux'

// interface AppProps {
//   title: string
//   msg: string
//   status
// }

export const Notify: NextPage = (): JSX.Element => {
  const { title, msg, status } = useSelector((state: RootState) => state.notify)
  const dispatch = useDispatch()
  console.log('title', title)
  console.log('msg', msg)
  console.log('status', status)

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
    <div
      className={activeClasses}
      onClick={() => dispatch(message({ title: '', msg: '', status: 'hide' }))}
    >
      <h2>{title}</h2>
      <p>{msg}</p>
    </div>
  )
}
