import type { NextPage } from 'next'

interface AppProps {
  data: string
}

export const Hero: NextPage<AppProps> = ({ data }): JSX.Element => {
  return <div>Hero</div>
}
