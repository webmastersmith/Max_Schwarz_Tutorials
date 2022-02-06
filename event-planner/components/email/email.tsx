import type { NextPage } from 'next'
import { useRef } from 'react'
import styles from './email.module.scss'
import { Button } from 'ui'
import { message } from 'reduxToolkit'
import { useDispatch } from 'react-redux'
import { Notify } from 'components'

export const RegisterEmail: NextPage = (): JSX.Element => {
  // const [msg, setMsg] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const handleClick = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const email = emailRef.current?.value

    // status message to pending
    dispatch(
      message({
        title: 'Sending Email',
        msg: 'Please wait while email is sent.',
        status: 'pending',
      })
    )

    // status message to success or error
    let data
    try {
      const response = await fetch('http://localhost:3000/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      // check
      data = await response.json()
      if (response.ok) {
        dispatch(
          message({
            title: 'Email Sent!',
            msg: data.msg,
            status: 'success',
          })
        )
        // response.status was not 200-299, throw error.
      } else {
        throw new Error(data.msg)
      }
    } catch (e) {
      dispatch(
        message({
          title: 'Error',
          msg: `${data.msg}`,
          status: 'error',
        })
      )
    }

    // reset form -could be null, so if check needed.
    // if (!!emailRef.current) {
    //   emailRef.current.value = ''
    // }
  }

  // const checkMsg = (msg: string) => {
  //   // if (msg) {
  //   //   return (
  //   //     <div className={styles.emailWrapperDiv}>
  //   //       <h1 className={styles.h1}>{msg}</h1>
  //   //     </div>
  //   //   )
  //   // }
  // }

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
      <Notify />
    </div>
  )
}
