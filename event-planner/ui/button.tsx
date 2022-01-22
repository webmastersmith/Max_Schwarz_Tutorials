import React from 'react'
import Link from 'next/link'
import styles from './button.module.scss'

interface AppProps {
  children: React.ReactNode
  href: string
}

export const Button = ({ children, href }: AppProps): JSX.Element => {
  return (
    <Link href={href}>
      <a className={styles.btn}>{children}</a>
    </Link>
  )
}
