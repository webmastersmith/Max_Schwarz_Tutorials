import { useMemo } from 'react'
import path from 'path'
import fs from 'fs'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'

const Home = ({ data }: any) => {
  const Component = useMemo(() => getMDXComponent(data.code), [data.code])
  return (
    <div>
      <h1>Hello Next</h1>
      <Component />
    </div>
  )
  // return (
  //   <div className={styles.container}>
  //     <h1>Hello Next World!</h1>
  //     <ul>
  //       <li>
  //         <Link href="/about">About</Link>
  //       </li>
  //       <li>
  //         <Link href="/blog/hello">Blog</Link>
  //       </li>
  //     </ul>
  //   </div>
  // )
}

export default Home

export const getStaticProps = async () => {
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    )
  }

  const directoryPath = path.join(process.cwd(), 'posts')
  const source = fs.readFileSync(
    path.join(directoryPath, 'example.mdx'),
    'utf-8'
  )

  const { code, frontmatter } = await bundleMDX({ source, cwd: directoryPath })
  return {
    props: {
      data: { code, frontmatter },
    },
  }
}
