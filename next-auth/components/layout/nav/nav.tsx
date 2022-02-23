import type { NextPage } from 'next'
import styles from './nav.module.scss'
import Link from 'next/link'
import { Button } from 'ui'
import { signOut, useSession } from 'next-auth/react'

export const Nav: NextPage = () => {
  // returns array with two elements: session object, loading
  const { data: session, status } = useSession()

  const handleLogout = async () => {
    await signOut()
  }
  return (
    <div className={styles.navbar}>
      <Link href="/">
        <a className={styles.logo}>Next Auth</a>
      </Link>
      <div className={styles.links}>
        {!session && (
          <Link href="/login">
            <a className={styles.link}>Login</a>
          </Link>
        )}
        {session && (
          <Link href="/profile">
            <a className={styles.link}>Profile</a>
          </Link>
        )}

        {session && (
          <Button
            type="button"
            style={{ backgroundColor: 'var(--bg-color)' }}
            onClick={handleLogout}
            className={styles.link}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  )
}
