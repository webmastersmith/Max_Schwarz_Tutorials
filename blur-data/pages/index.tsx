import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return <div className={styles.container}>Hello Next!</div>
}

export default Home

import type { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { getPlaiceholder } from 'plaiceholder'
interface PropsType extends ParsedUrlQuery {
  slug: string
}
export const getStaticProps: GetStaticProps = async (context) => {
  // const { slug } = context.params
  const { base64 } = await getPlaiceholder('/nextjs-file-based-routing.png')
  console.log(base64)

  return {
    props: {
      data: {},
    },
  }
}
