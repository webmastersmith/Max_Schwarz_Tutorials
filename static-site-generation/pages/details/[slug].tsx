import { readFileSync } from 'fs'
import path from 'path'
import { AppProps } from '../index'

const DynamicDetails = (props: AppProps) => {
  const { description, title } = props

  if (!props?.title) {
    // console.log('Loading was returned')
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>User Profile Page</h1>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default DynamicDetails

export async function getStaticProps(context: any) {
  const { params } = context //{slug: p2}
  const filePath = path.join(process.cwd(), 'data', 'data.json')
  const { products } = JSON.parse(readFileSync(filePath, 'utf-8'))

  const product = products.find(({ id }: AppProps) => id === params.slug)
  if (!product) {
    return { notFound: true }
  }

  return {
    props: product,
  }
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'data.json')
  const { products } = JSON.parse(readFileSync(filePath, 'utf-8'))
  const paths = products.map(({ id }: { id: string }) => {
    return {
      params: {
        slug: id,
      },
    }
  })
  // returns object with 'paths' key: Array of objects.
  return {
    paths,
    fallback: true,
  }
}
