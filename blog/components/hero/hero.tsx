import type { NextPage } from 'next'
import styles from './hero.module.scss'
import Image from 'next/image'

// interface AppProps {
//   data: string
// }

export const Hero: NextPage = (): JSX.Element => {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/Bryon.Suit.jpg"
          alt="Image of Bryon"
          width={300}
          height={300}
          quality={100}
          priority
        />
      </div>
      <h1>Hi, I&apos;m Bryon</h1>
      <p>I blog about web development - especially the full stack.</p>
    </section>
  )
}
