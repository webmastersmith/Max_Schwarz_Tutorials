import Image from 'next/image'
import styles from './EventCardImage.module.scss'

interface AppProps {
  image: string
  title: string
}

export const EventImage = ({ image, title }: AppProps): JSX.Element => {
  return (
    <div className={styles.cardImageContainer}>
      <div className={styles.cardImage}>
        <Image
          src={'/' + image}
          alt={title}
          width={160}
          height={160}
          objectFit="cover"
        />
      </div>
    </div>
  )
}
