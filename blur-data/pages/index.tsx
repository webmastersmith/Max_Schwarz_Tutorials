import type { NextPage, GetStaticProps } from 'next'
import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'

interface Props {
  images: any[]
}

const Home: NextPage<Props> = ({ images }) => {
  return (
    <div className={styles.container}>
      {images.map((image, i) => {
        const { img, svg, blurhash, base64, css } = image
        return (
          <div key={img.src + i} className={styles.card}>
            <Image src={img.src} alt={img.src} width={200} height={150} />
            <h4>{JSON.stringify(img, null, 2)}</h4>
            <div>
              <h5>base64: blurDataURL</h5>
              <p style={{ fontSize: '0.5rem' }}>{base64}</p>
            </div>
            <div>
              <h5>CSS</h5>
              <p>backgroundImage: {css.backgroundImage}</p>
              <p>backgroundPosition: {css.backgroundPosition}</p>
              <p>backgroundSize: {css.backgroundSize}</p>
              <p>backgroundRepeat: {css.backgroundRepeat}</p>
            </div>
            <div>
              <h5>Blurhash</h5>
              <p>{JSON.stringify(blurhash, null, 2)}</p>
            </div>
            <div className={styles.svg}>
              <h5>{svg[0]}</h5>
              <p>{JSON.stringify(svg[1], null, 2)}</p>
              <p>{JSON.stringify(svg[2], null, 2)}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const fileNames = fs
    .readdirSync(path.join(process.cwd(), 'public', 'images'))
    .filter((image) => /\.(svg|png|jpg|jpeg|webp|avif)$/.test(image))

  const images = await Promise.all(
    fileNames.map((fileName) => getPlaiceholder(`/images/${fileName}`))
  )

  return {
    props: { images },
  }
}
