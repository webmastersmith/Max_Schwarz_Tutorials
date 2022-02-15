import type { NextPage } from 'next'
import Image from 'next/image'

interface Props {
  image: string
  src: string
  alt: string
  width: number
  height: number
  priority: boolean
}

export const GetStartedImage: NextPage<Props> = ({
  image,
  src,
  alt,
  width,
  height,
  priority,
}): JSX.Element => {
  return (
    <Image
      src={`/images/post/${image.replace(/\.(svg|png|jpg)/, '')}/${src}`}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
    />
  )
}
