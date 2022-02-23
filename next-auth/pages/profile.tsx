import type { NextPage, GetServerSideProps } from 'next'
// import { useRouter } from 'next/router'
import { ResetPasswordForm } from 'components'
import { useSession, getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

interface Profile {
  expires: string
  id: string
  user: { email: string }
}
interface Props {
  profile: Profile
}
const ProfilePage: NextPage<Props> = ({ profile }) => {
  const [userSession, setUserSession] = useState<Profile | null>(null)
  console.log('profile', profile)
  useEffect(() => {
    if (profile) {
      setUserSession(profile)
    }
  }, [profile])

  const { expires, id, user } = profile
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>
        Your User Profile
      </h1>
      <ResetPasswordForm profile={profile} />
      <p style={{ marginTop: '2rem' }}>{id}</p>
      <p>Cookie Expiration: {expires}</p>
      <p>{user?.email}</p>
    </div>
  )
}

export default ProfilePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log('profile context req', context.req.cookies)
  const session = await getSession(context)
  const profile = session
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { profile },
  }
}
