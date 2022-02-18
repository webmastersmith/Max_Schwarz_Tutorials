import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import styles from './contactForm.module.scss'
import { Notification } from 'components'
import { MsgType } from 'types'

interface DataType {
  email: FormDataEntryValue
  message: FormDataEntryValue
  fullName: FormDataEntryValue
}
type StatusType = 'pending' | 'success' | 'error' | null
export const ContactForm: NextPage = () => {
  const [msg, setMsg] = useState<string>('')
  const [status, setStatus] = useState<StatusType>(null)
  const [errorMsg, setErrorMsg] = useState<string>('')

  // clear message after 3 seconds.
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => {
        setStatus(null)
        setErrorMsg('')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [status])

  const handleSubmit: React.FormEventHandler = async (event): Promise<void> => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const dataObject: unknown = Object.fromEntries(formData)
    const data = dataObject as DataType
    // console.log('dataObject', dataObject)
    setStatus('pending')
    let result: { msg: string } = { msg: '' }
    try {
      const res = await fetch('http://localhost:3000/api/form', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (res.status > 399) {
        throw new Error(result.msg)
      }
      setStatus('success')
      setMsg(result.msg)
    } catch (error) {
      console.log('error', error)
      setStatus('error')
      setErrorMsg(JSON.stringify(`${error} ${result.msg}`))
    }
    //reset form.
    if (event.target instanceof HTMLFormElement) event.target.reset()
  }

  let notify: MsgType = { status, title: '', msg: '', isOpen: !!status }
  if (status === 'pending') {
    notify = {
      status,
      title: 'Sending',
      msg: 'Talking to server...',
      isOpen: !!status,
    }
  }
  if (status === 'success') {
    notify = {
      status,
      title: 'Success',
      msg,
      isOpen: !!status,
    }
  }
  if (status === 'error') {
    notify = {
      status,
      title: 'Error',
      msg: errorMsg,
      isOpen: !!status,
    }
  }

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div className={styles.control}>
            <label htmlFor="fullName">Full Name</label>
            <input type="text" name="fullName" id="fullName" required />
          </div>
        </div>

        <div className={styles.control}>
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" rows={5}></textarea>
        </div>
        <div className={styles.actions}>
          <button type="submit" disabled={!!status}>
            Send Message
          </button>
        </div>
      </form>
      <Notification notify={notify} />
    </section>
  )
}
