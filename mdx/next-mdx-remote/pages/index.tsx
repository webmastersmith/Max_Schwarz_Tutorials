import styles from '../styles/Home.module.css'
import { serialize } from 'next-mdx-remote/serialize'
import imageSize from 'rehype-img-size'
import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'

const components = {
  img: (props) => (
    // height and width are part of the props, so they get automatically passed here with {...props}
    <Image {...props} loading="lazy" />
  ),
}
const Home = ({ post }: any) => {
  const {
    mdxSource: { scope, compiledSource },
  } = post
  console.log('scope', scope)
  console.log('compiledSource', compiledSource)

  return (
    <div className={styles.container}>
      <MDXRemote {...post.mdxSource} components={components} />
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  // get your markdown here
  const directoryPath = path.join(process.cwd(), 'posts')
  const markdown = fs.readFileSync(
    path.join(directoryPath, 'example.mdx'),
    'utf-8'
  )
  // pass your markdown string to the serialize function
  const mdxSource = await serialize(markdown, {
    mdxOptions: {
      // use the image size plugin, you can also specify which folder to load images from
      // in my case images are in /public/images/, so I just prepend 'public'
      rehypePlugins: [[imageSize, { dir: 'public' }]],
    },
  })

  // return your serialized content as a prop here
  return {
    props: {
      post: {
        mdxSource,
      },
    },
  }
}
