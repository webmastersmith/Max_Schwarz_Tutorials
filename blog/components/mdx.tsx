import type { NextPage } from 'next'
import { useMemo } from 'react'
import Image from 'next/image'
import { getMDXComponent } from 'mdx-bundler/client'
import { PostType } from 'types'

interface Props {
  post: PostType
}

export const MdxImage: NextPage<Props> = ({ post }) => {
  const { code, blurDataURL, image } = post
  const Paragraph = (node: any) => {
    //props: children: { type: 'img', props: { src: 'woods.jpg', alt: "woods.jpg" }}

    if (typeof node.children !== 'string' && node.children.type === 'img') {
      // console.log('node', node)
      const {
        children: { type, props },
      } = node

      //![AltText (priority)(300x200)|(fill)](image.jpg)
      // console.log('props.alt', props.alt)
      const alt = props.alt?.replace(/ *[(].*[)]/g, '')
      // console.log('alt', alt)
      const isPriority = props.alt
        ? props.alt.toLowerCase().includes('(priority)')
        : false
      // console.log('isPriority', isPriority)
      const size = props.alt.match(/\((\d*)x(\d*)\)/)
      // console.log('size', size)
      const width = size ? size[1] : '768'
      const height = size ? size[2] : '432'
      // console.log('width, height', width, height)

      // <> {} / must be escaped in mdx.
      const src = `/images/posts/${image.replace(/\.(png|jpg)/, '')}/${
        props.src
      }`
      console.log('MdxImage_src:', src)

      return (
        <div>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={isPriority}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      )
    }
    return <p {...node} />
  }
  const components = {
    p: Paragraph,
  }
  const Component = useMemo(() => getMDXComponent(code), [code])
  return <Component components={components} />
}

// export const MdxImage = memo(_MdxImage)
