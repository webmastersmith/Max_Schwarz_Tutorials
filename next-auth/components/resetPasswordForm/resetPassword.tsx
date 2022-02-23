import type { NextPage } from 'next'
import styles from '../loginForm/loginForm.module.scss'
import { Button } from 'ui'
import { signIn } from 'next-auth/react'

export interface Profile {
  expires: string
  id: string
  user: { email: string }
}

interface Props {
  profile: Profile
}

export const ResetPasswordForm: NextPage<Props> = ({ profile }) => {
  const handleSubmit: React.FormEventHandler = async (event): Promise<void> => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const dataObject: unknown = Object.fromEntries(formData)
    const data = dataObject as {
      password: string
      newPassword: string
    }

    //redirect: false prevents screen change if error in login.
    const res = await fetch('http://localhost:3000/api/user/change-password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await res.json()

    console.log('resetPassword result', result)

    // type PasswordType = { password: string; newPassword: string }
    // const passwordChangeResult = result as PasswordType
    // console.log('Password change Form result', passwordChangeResult)
    // if (signInResult.ok) router.push(signInResult.url)

    // if (event.target instanceof HTMLFormElement) event.target.reset() //reset form.
  }

  return (
    <div className={styles.container}>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="password">Your Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input type="password" name="newPassword" id="newPassword" required />
        </div>

        <Button
          type="submit"
          style={{ padding: '0.5rem 2rem', margin: '1rem 0' }}
        >
          Change Password
        </Button>
      </form>
    </div>
  )
}
