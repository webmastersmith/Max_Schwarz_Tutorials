/* eslint-disable jsx-a11y/no-redundant-roles */
import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './nav.module.scss'

export const Nav: FC<{}> = (): JSX.Element => {
  const links: string[][] = [
    ['all_meetups', 'All Meetups'],
    ['new_meetups', 'New Meetups'],
    ['favorite_meetups', 'Favorite Meetups'],
  ]

  return (
    <nav className={`${styles.navWrapper} ${styles.flexer}`}>
      <Link to="/" className={styles.headerLink}>
        React Meetups
      </Link>
      <ul role="list" className={`${styles.headerLink} ${styles.flexer}`}>
        {getLinks(links)}
      </ul>
    </nav>
  )
}

const getLinks = (links: string[][]): JSX.Element[] => {
  return links.map((link: string[], i: number) => {
    return (
      <li key={link[0] + i}>
        <Link to={link[0]}>{link[1]}</Link>
      </li>
    )
  })
}
