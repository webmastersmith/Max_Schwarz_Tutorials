import type { NextPage } from 'next'
import styles from './Layout.module.scss'
import { Nav } from 'components'

export const Layout: NextPage = ({ children }) => {
  return (
    <div>
      <Nav />
      <div className={styles.container}>{children}</div>
    </div>
  )
}
