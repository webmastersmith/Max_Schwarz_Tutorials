import type { NextPage } from 'next'
import { Header } from './header'

export const Nav: NextPage = ({ children }): JSX.Element => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}
