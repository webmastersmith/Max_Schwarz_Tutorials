import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getMDXComponent } from 'mdx-bundler/client'
import * as React from 'react'
import { getCompiledMDX, getFileContent } from 'utils'
import { getPlaiceholder } from 'plaiceholder'

const Paragraph = (node: any) => {
  //props: children: { type: 'img', props: { src: 'woods.jpg', alt: "woods.jpg" }}
  console.log('node', node)

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
    console.log('isPriority', isPriority)
    const size = props.alt.match(/\((\d*)x(\d*)\)/)
    console.log('size', size)
    const width = size ? size[1] : '768'
    const height = size ? size[2] : '432'
    console.log('width, height', width, height)

    // <> {} / must be escaped in mdx.
    const blurDataURL = props.alt.match(/data:[\w/\\;,=]+/)
    console.log('dataBlur', blurDataURL)

    //   const isFill = props.alt ? /fill|responsive/.test(props.alt) : false
    //   console.log('isFill', isFill)
    // if (isFill) {
    //   const stretch = props.alt.match(/\([^x]*x([^x]*)\)/)
    //   console.log('stretch', stretch)

    //   return (
    //     // <div style={{ position: 'relative', height: '500px' }}>
    //     <div>
    //       <Image
    //         src={`/images/${props.src}`}
    //         alt={alt}
    //         priority={isPriority}
    //         layout={'responsive'}
    //         width={width}
    //         height={200}
    //       />
    //     </div>
    //   )
    // }
    return (
      <div>
        <Image
          src={`/images/${props.src}`}
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
//   console.log('props', props)

//   return <Image src={`/images/${src}`} alt={alt} width={300} height={200} />
// }

const components = {
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

const Home = ({ code, frontmatter, blurDataURL }: any) => {
  // console.log(code)
  console.log('frontmatterrrrr', frontmatter)
  console.log('blurDataURL', blurDataURL)

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
  const { base64 } = await getPlaiceholder(`/images/woods.jpg`)
  console.log('base64', base64)

  // console.log('data', data)

  return {
    props: { ...data, blurDataURL: base64 },
  }
}
