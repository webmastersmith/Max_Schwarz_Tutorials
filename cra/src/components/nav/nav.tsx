/* eslint-disable jsx-a11y/no-redundant-roles */
import { FC, useContext } from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'
import styles from './nav.module.scss'
import { FavoritesContext } from 'store'

interface NavType {
  page: string
  msg: string
  badge: boolean
}

export const Nav: FC = (): JSX.Element => {
  const { favorites } = useContext(FavoritesContext)
  const links: NavType[] = [
    { page: 'all_meetups', msg: 'All Meetups', badge: false },
    { page: 'new_meetups', msg: 'New Meetups', badge: false },
    { page: 'favorite_meetups', msg: 'Favorite Meetups', badge: true },
  ]

  return (
    <nav className={`${styles.navWrapper} ${styles.flexRowCenter}`}>
      <LinkBuilder to="/" className={`${styles.headerLink}`}>
        React Meetups
      </LinkBuilder>
      <ul
        role="list"
        className={`${styles.headerLink} ${styles.flexRowCenter}`}
      >
        {getLinks(links, favorites.length)}
      </ul>
    </nav>
  )
}

const getLinks = (links: NavType[], numOfFavorites: number): JSX.Element[] => {
  return links.map((link: NavType, i: number) => {
    const { page, msg, badge } = link
    return (
      <li key={page + i} className={styles.pageLink}>
        <LinkBuilder to={page} className="">
          {msg}
        </LinkBuilder>
        {badge ? (
          <div className={badge ? styles.favoritesBadge : ''}>
            {numOfFavorites}
          </div>
        ) : null}
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
