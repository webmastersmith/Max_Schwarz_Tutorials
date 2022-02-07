import type { NextPage } from 'next'
import { Logo } from './logo'
import Link from 'next/link'
import styles from './header.module.scss'

//interface Props {
//data: string
//}

//export const Header: NextPage<Props> = ({data}): JSX.Element => {
export const Header: NextPage = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <Link href="/" passHref>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
