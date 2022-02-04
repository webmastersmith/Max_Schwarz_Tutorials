import { db, createCollection } from 'utils'
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  limit,
} from 'firebase/firestore'
import type { NextApiResponse } from 'next'
import { Data } from 'pages/api/email'

interface EmailType {
  date: Date
  email: string
}

export async function sendEmail(
  email: string,
  res: NextApiResponse<Data>
): Promise<void> {
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  // validate email
  if (validEmail.test(email)) {
    //query all emails
    const emailCol = createCollection<EmailType>('emails')
    //make sure unique, will return email if exist.
    const q = query(emailCol, where('email', '==', email), limit(1))
    const querySnapshot = await getDocs(q)
    // no match found, email is unique if querySnapshot is empty.
    if (querySnapshot.empty) {
      // send valid unique email.
      const emailRef = await addDoc(collection(db, 'emails'), {
        email,
        date: new Date().toISOString(),
      })
      console.log('email was posted successfully!', emailRef?.id)
      res.status(200).json({ msg: 'Thank you for your email' })
    } else {
      // email already exist in db.
      res.status(200).json({ msg: 'Thank you for your existing email' })
    }

    // email failed regex and is invalid
  } else {
    res.status(200).json({ msg: 'Please check email and try again.' })
  }
}
