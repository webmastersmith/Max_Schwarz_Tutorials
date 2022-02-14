import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import fs from 'fs'
import path from 'path'
import { getMDXComponent } from 'mdx-bundler/client'
import * as React from 'react'
import { getCompiledMDX, getFileContent } from 'utils'

const Paragraph: React.FC<any> = (node) => {
  //props: children: { type: 'img', props: { src: 'woods.jpg', alt: "woods.jpg" }}

  if (typeof node.children !== 'string' && node.children.type === 'img') {
    const {
      children: { type, props },
    } = node

    //![AltText (priority)(300x200)|(fill)](image.jpg)
    console.log('props.alt', props.alt)
    const alt = props.alt?.replace(/ *[(].*[)]/g, '')
    console.log('alt', alt)
    const isPriority = props.alt
      ? props.alt.toLowerCase().includes('(priority)')
      : false
    const isFill = props.alt ? /fill|responsive/.test(props.alt) : false
    console.log('isPriority', isPriority)
    console.log('isFill', isFill)
    const size = props.alt.match(/\((\d*)x(\d*)\)/)
    console.log('size', size)
    const width = size ? size[1] : '768'
    const height = size ? size[2] : '432'
    console.log('width, height', width, height)

    if (isFill) {
      const stretch = props.alt.match(/\([^x]*x([^x]*)\)/)
      console.log('stretch', stretch)

      return (
        // <div style={{ position: 'relative', height: '500px' }}>
        <div>
          <Image
            src={`/images/${props.src}`}
            alt={alt}
            priority={isPriority}
            layout={'responsive'}
            width={width}
            height={200}
          />
        </div>
      )
    }
    return (
      <div>
        <Image
          src={`/images/${props.src}`}
          alt={alt}
          width={width}
          height={height}
          priority={isPriority}
        />
      </div>
    )
  }
  return <p {...node} />
}

// const Anchor: React.FC<Partial<ReactHTMLElement<HTMLAnchorElement>['props']>> =
//   props => {
//     const {href, children} = props
//     if (!href) {
//       return <a {...props} />
//     }
//     if (href!.substr(0, 4) === 'http') {
//       return (
//         <OutboundLink eventLabel="Content Outbound Link" to={href!}>
//           {children}
//         </OutboundLink>
//       )
//     }
//     return (
//       <Link href={href!}>
//         <a>{children}</a>
//       </Link>
//     )
//   }

// const Img = (props: any) => {
//   const { src, alt } = props
//   return <Image src={src} alt={alt} width={300} height={200} />
// }

export const components = {
  // img: Img,
  p: Paragraph,
  // a: Anchor,
  // pre: (preProps: Partial<ReactHTMLElement<HTMLPreElement>['props']>) => {
  //   const props = preToCodeBlock(preProps)

  //   if (props) {
  //     return <Code {...props} />
  //   }

  //   return <pre {...preProps} />
  // }
}

const Home: NextPage = ({ code, frontmatter }: any) => {
  // console.log(code)
  console.log('frontmatterrrrr', frontmatter)

  const Component = React.useMemo(() => getMDXComponent(code), [code])

  return (
    <div className={styles.container}>
      <p>Title: {frontmatter.title}</p>
      <Component components={components} />
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const data = await getCompiledMDX(getFileContent('example.mdx'))
  // console.log('data', data)

  return {
    props: { ...data },
  }
}
