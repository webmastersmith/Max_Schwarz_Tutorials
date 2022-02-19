import type { NextPage } from 'next'
import styles from './nav.module.scss'
import Link from 'next/link'

export const Nav: NextPage = ({ children }) => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>Next Auth</div>
      <div className={styles.links}>
        <Link href="/login">Login</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/profile">
          <button>Logout</button>
        </Link>
      </div>
    </div>
  )
}
