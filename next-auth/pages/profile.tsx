import type { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { LoginForm } from 'components'
import { useSession, getSession } from 'next-auth/react'
import { useEffect } from 'react'
// import { useState, useEffect } from 'react'
interface Props {
  user: {}
}
const ProfilePage: NextPage<Props> = ({ children, user }) => {
  // const [isLoading, setIsLoading] = useState(true)
  // const [loadedSession, setLoadedSession] = useState(null)
  useEffect(() => {
    if (user) {
    }
  }, [user])
  const { data: session, status } = useSession()
  // console.log('profile page', status)
  const router = useRouter()

  if (status === 'unauthenticated') router.push('/')
  if (status === 'loading') return <p>Loading...</p>

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>
        Your User Profile
      </h1>
      <LoginForm />
    </div>
  )
}

export default ProfilePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log('profile context req', context.req.cookies)
  const session = await getSession(context)
  // console.log('profilepage session', session)

  return {
    props: {
      user: {},
    },
  }
}
