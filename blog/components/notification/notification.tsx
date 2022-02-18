import { createPortal } from 'react-dom'
import { MsgType } from 'types'
import styles from './notification.module.css'

interface Props {
  notify: MsgType
}
export function Notification({ notify }: Props) {
  const { title, msg, status, isOpen } = notify
  let statusClasses = ''

  if (status === 'success') {
    statusClasses = styles.success
  }

  if (status === 'error') {
    statusClasses = styles.error
  }

  const cssClasses = `${styles.notification} ${statusClasses}`

  return isOpen
    ? createPortal(
        <div className={cssClasses}>
          <h2>{title}</h2>
          <p>{msg}</p>
        </div>,
        document.body
      )
    : null
}
