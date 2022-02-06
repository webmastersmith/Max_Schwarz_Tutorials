import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Layout } from 'layout'
import Head from 'next/head'
import { store } from 'reduxToolkit'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <title>Events of Greatness!</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
