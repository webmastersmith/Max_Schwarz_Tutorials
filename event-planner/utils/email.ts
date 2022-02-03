import { db, createCollection } from 'utils'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import type { NextApiResponse } from 'next'
import { Data } from 'pages/api/[slug]'

interface EmailType {
  date: Date
  email: string
}

export async function sendEmail(
  email: string,
  res: NextApiResponse<Data>
): Promise<void> {
  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  // valid email
  if (validEmail.test(email)) {
    console.log('valid email')

    //get all emails
    const emailCol = createCollection<EmailType>('emails')
    //make sure unique, will return email if exist.
    const q = query(emailCol, where('email', '==', email))
    const querySnapshot = await getDocs(q)
    // no match found, email is unique, querySnapshot is empty.
    if (querySnapshot.empty) {
      // send valid unique email.
      const docRef = await addDoc(collection(db, 'emails'), {
        email,
        date: new Date().toISOString(),
      })
      console.log(docRef?.id)
      res.status(200).json({ msg: 'Thank you for your email' })
    } else {
      res.status(200).json({ msg: 'Thank you for your existing email' })
    }

    // email failed regex and is invalid
  } else {
    res.status(200).json({ msg: 'Please check email and try again.' })
  }
}
