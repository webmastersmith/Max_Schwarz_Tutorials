import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Nav } from 'nav'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Nav>
      <Head>
        <title>Bryon&apos;s Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Nav>
  )
}

export default MyApp
