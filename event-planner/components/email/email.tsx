import type { NextPage } from 'next'
import { useRef } from 'react'
import styles from './email.module.scss'
import { Button } from 'ui'
import { db } from 'utils'
import { addDoc, collection, Timestamp } from 'firebase/firestore'

// interface AppProps {
//   data: string
// }

export const RegisterEmail: NextPage = (): JSX.Element => {
  // const [email, setEmail] = useState<string>('')
  const emailRef = useRef<HTMLInputElement>(null)
  const handleClick = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    console.log(emailRef.current?.value)

    const email = emailRef.current?.value
    const docRef = await addDoc(collection(db, 'emails'), {
      email,
      date: Timestamp.now(),
    })

    console.log(docRef)
    console.log(docRef?.id)

    // reset form
    if (emailRef.current) {
      emailRef.current.value = ''
    }
  }

  return (
    <div>
      <h1 className={styles.h1}>Sign up to stay updated!</h1>
      <div className={styles.inputContainerDiv}>
        <input
          type="email"
          placeholder="Your Email"
          className={styles.input}
          ref={emailRef}
          // onChange={handleChange}
          // value={email}
          required
        />
        <Button type="button" classes={styles.button} click={handleClick}>
          Register
        </Button>
      </div>
    </div>
  )
}
