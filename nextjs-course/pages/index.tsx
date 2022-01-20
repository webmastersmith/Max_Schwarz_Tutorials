import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import { test } from 'pages/about'

const Home: NextPage = () => {
  console.log(test)

  return (
    <div className={styles.container}>
      <h1>Hello Next World!</h1>
      <ul>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/blog/hello">Blog</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
