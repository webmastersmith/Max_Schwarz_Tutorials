import { FC } from 'react'
import styles from './Container.module.scss'

export const Container: FC<{}> = ({ children }): JSX.Element => {
  return <div className={styles.container}>{children}</div>
}
