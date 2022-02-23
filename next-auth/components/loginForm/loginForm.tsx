import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from './loginForm.module.scss'
import { Button } from 'ui'
import { signIn } from 'next-auth/react'

interface Result {
  error: any
  ok: boolean
  status: number
  url: string
}
export const LoginForm: NextPage = () => {
  const [isLogin, setIsLogin] = useState(false)
  const router = useRouter()

  const handleSubmit: React.FormEventHandler = async (event): Promise<void> => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const dataObject: unknown = Object.fromEntries(formData)
    const data = dataObject as { email: string; password: string }

    console.log(data)
    // if trying to login
    if (isLogin) {
      //redirect: false prevents screen change if error in login.
      const { email, password } = data
      const result: unknown = await signIn('credentials', {
        callbackUrl: 'http://localhost:3000/profile',
        redirect: false,
        email,
        password,
      })
      const signInResult = result as Result
      console.log('loginForm signInResult', signInResult)
      if (signInResult.ok) router.push(signInResult.url)
      // new client. sign up
    } else {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      console.log(res.status)
      const result = await res.json()
      console.log(result)
    }

    // if (event.target instanceof HTMLFormElement) event.target.reset() //reset form.
  }
  return (
    <div className={styles.container}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input type="password" name="password" id="password" required />
        </div>

        <Button
          type="submit"
          style={{ padding: '0.5rem 2rem', margin: '1rem 0' }}
        >
          {isLogin ? 'Login' : 'Create Account'}
        </Button>
      </form>
      <Button
        type="button"
        className="buttonHover"
        style={{
          padding: '0.2rem 1rem',
          backgroundColor: 'var(--bg-color)',
          color: 'var(--bg-second)',
        }}
        onClick={() => setIsLogin((s) => !s)}
      >
        {isLogin ? 'Create new account' : 'Login with existing account'}
      </Button>
    </div>
  )
}
