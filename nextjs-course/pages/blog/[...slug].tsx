import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const BlogPage: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query

  console.log(slug)

  const handleClick = () => {
    // router.push('/about/something')
    router.push({
      pathname: '/about/[aboutId]',
      query: { aboutId: 'something' },
    })
  }
  return (
    <div>
      BlogPage
      <button onClick={handleClick}>go to about page</button>
    </div>
  )
}

export default BlogPage
