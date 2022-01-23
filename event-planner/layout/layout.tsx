import React from 'react'
import { MainHeader } from 'layout'

interface AppProps {
  children: React.ReactNode
}

export const Layout = ({ children }: AppProps): JSX.Element => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  )
}
