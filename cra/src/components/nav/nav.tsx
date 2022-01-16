import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from './nav.module.scss'

export const Nav: FC<{}> = (): JSX.Element => {
  return (
    <nav className={styled.nav}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="all_meetups">All Meet UPs</Link>
        </li>
        <li>
          <Link to="new_meetups">New Meet Ups</Link>
        </li>
        <li>
          <Link to="favorite_meetups">Favorite Meet Ups</Link>
        </li>
      </ul>
    </nav>
  )
}
