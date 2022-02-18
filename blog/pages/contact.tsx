import type { NextPage } from 'next'
import Head from 'next/head'
import { ContactForm } from 'components'

const ContactPage: NextPage = ({ children }) => {
  return (
    <>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Sign up to email form." />
      </Head>

      <ContactForm />
    </>
  )
}

export default ContactPage
