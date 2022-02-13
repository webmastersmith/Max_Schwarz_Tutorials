import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ReactMarkdown from 'react-markdown'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const Home = ({ data, content }: any) => {
  console.log('data', data)

  // img(props: any) {
  //   return (
  //     <Image
  //       src={`/images/${props.src}`}
  //       alt={props.alt}
  //       width={300}
  //       height={200}
  //     />
  //   )
  // },
  const components = {
    p({ node, children }: any) {
      console.log('node', JSON.stringify(node, null, 2))

      // return children
      // ![AltText {priority}{768x432}](/image.jpg)
      if (node.children[0].tag) {
      }
      const temp = node.children.reduce((acc: any, child: any) => {
        // child: {tagName: "p", properties: {src: '', alt: ''}, children: Array(0), position: {…}}
        console.log('child', child)

        // return child
        if (child.tagName === 'img') {
          const alt = child.properties.alt?.replace(/ *\{[^)]*\} */g, '')
          const isPriority = child.properties.alt
            ?.toLowerCase()
            .includes('{priority}')
          const metaWidth = child.properties.alt.match(/{([^}]+)x/)
          const metaHeight = child.properties.alt.match(/x([^}]+)}/)
          const width = metaWidth ? metaWidth[1] : '768'
          const height = metaHeight ? metaHeight[1] : '432'
          return (
            <div style={{ backgroundColor: 'grey' }}>
              <Image
                src={`/images/${child.properties.src}`}
                alt={child.properties.alt}
                width={300}
                height={200}
                priority={true}
              />
            </div>
          )
        }
        return <p>{child}</p>
      }, [])

      return children
    },
  }

  return (
    <div className={styles.container}>
      <h1>Hello Next!</h1>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const ROOT = process.cwd()
  const POST_PATH = path.join(ROOT, 'posts')
  function getContents(fileName: string) {
    return fs.readFileSync(path.join(POST_PATH, fileName), 'utf-8')
  }
  const source = getContents('example.mdx')
  const { data, content } = matter(source)

  return {
    props: { data, content },
  }
}
