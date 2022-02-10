import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import fs from 'fs'
import path from 'path'
import { getMDXComponent } from 'mdx-bundler/client'
import * as React from 'react'
import { getCompiledMDX, getFileContent } from 'utils'

const Home: NextPage = ({ code, frontmatter }: any) => {
  // console.log(code)
  // console.log(frontmatter)

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
  const data = await getCompiledMDX(getFileContent('example.mdx'))
  // console.log('data', data)

  return {
    props: { ...data },
  }
}
