import type { NextPage } from 'next'
import styles from './loginForm.module.scss'

export const LoginForm: NextPage = () => {
  const handleSubmit = () => {
    return
  }
  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Create new account</p>
    </div>
  )
}
