import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Nav } from 'nav'
import { store } from 'store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Nav>
        <Head>
          <title>Bryon&apos;s Blog</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <Component {...pageProps} />
      </Nav>
    </Provider>
  )
}

export default MyApp
