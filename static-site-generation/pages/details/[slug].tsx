import { useRouter } from 'next/router'
import { readFileSync } from 'fs'
import path from 'path'
import { AppProps } from '../index'

const DynamicDetails = (props: AppProps) => {
  const { description, title } = props

  const router = useRouter()
  const { slug } = router.query //'p2'

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default DynamicDetails

export async function getStaticProps(context: any) {
  const { params } = context //{slug: p2}

  const filePath = path.join(process.cwd(), 'data', 'data.json')
  const file = JSON.parse(readFileSync(filePath, 'utf-8'))
  const [product] = file.products.filter(
    ({ id }: AppProps) => id === params.slug
  )

  return {
    props: product,
  }
}

export async function getStaticPaths() {
  // returns object with 'paths' key: Array of objects.
  return {
    paths: [
      { params: { slug: 'p1' } },
      { params: { slug: 'p2' } },
      { params: { slug: 'p3' } },
    ],
    fallback: true,
  }
}
