import styles from './notification.module.css'
import { MsgType } from 'types'

export function Notification({ title, msg, status }: MsgType) {
  let statusClasses = ''

  if (status === 'success') {
    statusClasses = styles.success
  }

  if (status === 'error') {
    statusClasses = styles.error
  }

  const cssClasses = `${styles.notification} ${statusClasses}`

  return (
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{msg}</p>
    </div>
  )
}
