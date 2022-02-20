import type { NextPage } from 'next'
import { LoginForm } from 'components'

const ProfilePage: NextPage = ({ children }) => {
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
