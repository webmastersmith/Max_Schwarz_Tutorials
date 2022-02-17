import type { NextPage } from 'next'
import React from 'react'
import styles from './contactForm.module.scss'

export const ContactForm: NextPage = () => {
  const handleSubmit: React.FormEventHandler = (event): void => {
    event.preventDefault()
  }
  return (
    <section>
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
          <button>Send Message</button>
        </div>
      </form>
    </section>
  )
}
