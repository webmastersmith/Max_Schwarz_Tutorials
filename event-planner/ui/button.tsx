import React from 'react'
import Link from 'next/link'
import styles from './button.module.scss'

interface AppProps {
  children: React.ReactNode
  href?: string
  type?: 'submit'
}

export const Button = ({ children, href, type }: AppProps): JSX.Element => {
  if (href) {
    return (
      <Link href={href}>
        <a className={styles.btn}>{children}</a>
      </Link>
    )
  }
  if (type) {
    return (
      <button className={styles.btn} type={type}>
        {children}
      </button>
    )
  }
  return <button className={styles.btn}>{children}</button>
}
