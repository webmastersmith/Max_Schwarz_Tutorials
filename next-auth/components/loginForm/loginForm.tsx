import type { NextPage } from 'next'
import { useState } from 'react'
import styles from './loginForm.module.scss'
import { Button } from 'ui'

export const LoginForm: NextPage = () => {
  const [isLogin, setIsLogin] = useState(false)
  const handleSubmit: React.FormEventHandler = async (event): Promise<void> => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const dataObject: unknown = Object.fromEntries(formData)
    const data = dataObject as { email: string; password: string }
    console.log('data', data)
    // if (event.target instanceof HTMLFormElement) event.target.reset() //reset form.
  }
  return (
    <div className={styles.container}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input type="password" name="password" id="password" />
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
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Login with existing account' : 'Create new account'}
      </Button>
    </div>
  )
}
