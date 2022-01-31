import React from 'react'
import Link from 'next/link'
import styles from './main-header.module.scss'
// interface AppProps {
//   children: React.ReactNode
// }

export const MainHeader = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">NextEvents</Link>
      </div>
      <nav className={styles.navigation}>
        <ul role="list">
          <li>
            <Link href="/events/AllEvents">Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
