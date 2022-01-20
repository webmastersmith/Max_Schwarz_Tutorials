import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import { hello } from 'pages/about'

const Home: NextPage = () => {
  console.log(hello)

  return (
    <div className={styles.container}>
      <h1>Hello Next World!</h1>
    </div>
  )
}

export default Home
