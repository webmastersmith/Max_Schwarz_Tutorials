import Image from 'next/image'
import styles from './EventImage.module.scss'

interface AppProps {
  image: string
  title: string
}

export const EventImage = ({ image, title }: AppProps): JSX.Element => {
  return (
    <div className={styles.cardImage}>
      <Image src={'/' + image} alt={title} layout="fill" />
    </div>
  )
}
