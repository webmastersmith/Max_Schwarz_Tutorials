import type { NextPage } from 'next'
import { useRef, useState } from 'react'
import styles from './email.module.scss'
import { Button } from 'ui'
import { RootState, reset, success } from 'reduxToolkit'
import { useSelector, useDispatch } from 'react-redux'
import { Notify } from 'components'

export const RegisterEmail: NextPage = (): JSX.Element => {
  const [msg, setMsg] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)

  const handleClick = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const email = emailRef.current?.value
    const response = await fetch('http://localhost:3000/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    const data = await response.json()
    console.log(data.msg)
    setMsg(data.msg)

    // reset form -could be null, so if check needed.
    if (emailRef.current) {
      emailRef.current.value = ''
    }
  }

  const checkMsg = (msg: string) => {
    if (msg) {
      return (
        <div className={styles.emailWrapperDiv}>
          <h1 className={styles.h1}>{msg}</h1>
        </div>
      )
    }
    return (
      <div className={styles.emailWrapperDiv}>
        <h1 className={styles.h1}>Sign up to stay updated!</h1>
        <div className={styles.inputContainerDiv}>
          <input
            type="email"
            placeholder="Your Email"
            className={styles.input}
            ref={emailRef}
            required
          />
          <Button type="button" classes={styles.button} click={handleClick}>
            Register
          </Button>
        </div>
        <Notify title="test" msg="hello" />
      </div>
    )
  }

  return checkMsg(msg)
}
