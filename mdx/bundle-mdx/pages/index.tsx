import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { bundleMDX } from 'mdx-bundler'
import fs from 'fs'
import path from 'path'
import { getMDXComponent } from 'mdx-bundler/client'
import * as React from 'react'

const Home: NextPage = ({ data }: any) => {
  const { code, frontmatter } = data
  const Component = React.useMemo(() => getMDXComponent(code), [code])

  return (
    <div className={styles.container}>
      <p>Title: {frontmatter.title}</p>
      <Component />
    </div>
  )
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
  // const files = fs.readdirSync(directoryPath)
  const box = fs.readFileSync(
    path.join(process.cwd(), 'components', 'box.tsx'),
    'utf-8'
  )
  console.log(box)

  const mdxSource = fs.readFileSync(
    path.join(directoryPath, '', 'example.mdx'),
    'utf-8'
  )

  const data = await bundleMDX({
    source: mdxSource,
    files: {
      '../components/box.tsx': box,
    },
  })

  return {
    props: {
      data,
    },
  }
}
