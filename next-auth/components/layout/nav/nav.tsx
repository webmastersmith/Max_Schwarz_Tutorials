import type { NextPage } from 'next'
import styles from './nav.module.scss'
import Link from 'next/link'
import { Button } from 'ui'
import { useSession, signOut } from 'next-auth/react'

export const Nav: NextPage = ({ children }) => {
  // returns array with two elements: session object, loading
  const { data: session, status } = useSession()
  // console.log('session', session)
  // console.log('loading', status)

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className={styles.navbar}>
      <Link href="/">
        <a className={styles.logo}>Next Auth</a>
      </Link>
      <div className={styles.links}>
        {!session && <Link href="/login">Login</Link>}
        {session && <Link href="/profile">Profile</Link>}

        {session && (
          <Link href="/logout">
            <a>
              <Button
                type="button"
                style={{ backgroundColor: 'var(--bg-color)' }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </a>
          </Link>
        )}
      </div>
    </div>
  )
}
