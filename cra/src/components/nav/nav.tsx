/* eslint-disable jsx-a11y/no-redundant-roles */
import { FC } from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'
import styles from './nav.module.scss'

export const Nav: FC = (): JSX.Element => {
  const links: string[][] = [
    ['all_meetups', 'All Meetups'],
    ['new_meetups', 'New Meetups'],
    ['favorite_meetups', 'Favorite Meetups'],
  ]

  return (
    <nav className={`${styles.navWrapper} ${styles.flexer}`}>
      <LinkBuilder to="/" className={`${styles.headerLink}`}>
        React Meetups
      </LinkBuilder>
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
        <LinkBuilder to={link[0]} className="">
          {link[1]}
        </LinkBuilder>
      </li>
    )
  })
}

function LinkBuilder({ children, to, className }: LinkProps) {
  let resolved = useResolvedPath(to)
  let match = useMatch({ path: resolved.pathname, end: true })

  return (
    <div>
      <Link
        // style={{ textDecoration: match ? 'underline' : 'none' }}
        className={`${match ? 'active' : ''} ${className}`}
        to={to}
      >
        {children}
      </Link>
    </div>
  )
}
