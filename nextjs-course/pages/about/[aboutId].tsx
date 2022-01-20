import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const AboutId: NextPage = () => {
  const router = useRouter()
  const { aboutId } = router.query
  console.log(aboutId)

  return <div>AboutId</div>
}

export default AboutId
