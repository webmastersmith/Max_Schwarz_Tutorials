import type { NextPage } from 'next'
import styles from './nav.module.scss'
import Link from 'next/link'
import { Button } from 'ui'

export const Nav: NextPage = ({ children }) => {
  return (
    <div className={styles.navbar}>
      <Link href="/">
        <a className={styles.logo}>Next Auth</a>
      </Link>
      <div className={styles.links}>
        <Link href="/login">Login</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/logout">
          <a>
            <Button
              type="button"
              style={{ backgroundColor: 'var(--bg-color)' }}
            >
              Logout
            </Button>
          </a>
        </Link>
      </div>
    </div>
  )
}
