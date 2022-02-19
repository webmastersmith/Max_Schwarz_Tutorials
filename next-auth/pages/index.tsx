import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Nav } from 'components'

const Home: NextPage = () => {
  return (
    <div className="container">
      <Nav />
      <h1>Welcome on Board!</h1>
    </div>
  )
}

export default Home
