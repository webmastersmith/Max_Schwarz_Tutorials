import fs from 'fs'
import path from 'path'
import Link from 'next/link'

export interface AppProps {
  id: string
  title: string
  description: string
}

const HomePage = (props: { products: AppProps[] }): JSX.Element => {
  const { products } = props
  // console.log(props)

  return (
    <ul>
      {products &&
        products.map(({ id, title }: AppProps): JSX.Element => {
          return (
            <li key={id}>
              <Link href={`/details/${id}`}>{title}</Link>
            </li>
          )
        })}
    </ul>
  )
}

export default HomePage

export async function getStaticProps(context: any) {
  const filePath = path.join(process.cwd(), 'data', 'data.json')
  const file = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  return {
    props: file,
  }
}
