import React from 'react'
import Link from 'next/link'
import styles from './button.module.scss'

interface AppProps {
  children: React.ReactNode
  href?: string
}

export const Button = ({ children, href }: AppProps): JSX.Element => {
  if (href) {
    return (
      <Link href={href}>
        <a className={styles.btn}>{children}</a>
      </Link>
    )
  }
  return <button className={styles.btn}>{children}</button>
}
