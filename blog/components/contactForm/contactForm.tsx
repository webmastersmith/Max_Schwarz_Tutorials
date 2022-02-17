import type { NextPage } from 'next'
import React, { useState } from 'react'
import styles from './contactForm.module.scss'

export const ContactForm: NextPage = () => {
  const [msg, setMsg] = useState<string>('')
  const handleSubmit: React.FormEventHandler = async (event): Promise<void> => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const dataObject = Object.fromEntries(formData)
    // console.log('dataObject', dataObject)
    await fetch('http://localhost:3000/api/form', {
      method: 'POST',
      body: JSON.stringify(dataObject),
    })
      .then((res) => res.json())
      .then((data) => {
        setMsg(data.msg)
        console.log(data)
        if (event.target instanceof HTMLFormElement) event.target.reset()
      })

    //reset form.
  }
  return (
    <section className={styles.contact}>
      <h1>{msg ? msg : 'How can I help you?'}</h1>
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
          <button type="submit">Send Message</button>
        </div>
      </form>
    </section>
  )
}
