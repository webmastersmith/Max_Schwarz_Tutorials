import React from 'react'
import Link from 'next/link'
import styles from './button.module.scss'

interface AppProps {
  children: React.ReactNode
  href?: string
  type?: 'submit' | 'button'
  classes?: any
  click?: any
}

// Link
// <Button href={`/events/${id}`}><span className={styles.buttonIcon}>
//   Explore Event<span><ArrowRightIcon /></span>
// </span></Button>

// regular button
// <Button type="button" classes={styles.button}>Register</Button>
export const Button = ({
  children,
  href,
  type = 'button',
  classes = '',
  click = () => {},
}: AppProps): JSX.Element => {
  if (href) {
    return (
      <Link href={href}>
        <a className={`${styles.btn} ${classes}`}>{children}</a>
      </Link>
    )
  }
  if (type === 'button') {
    return (
      <button
        className={`${styles.btn} ${classes}`}
        type={type}
        onClick={click}
      >
        {children}
      </button>
    )
  }
  //submit button
  return (
    <button className={`${styles.btn} ${classes}`} type={type}>
      {children}
    </button>
  )
}
