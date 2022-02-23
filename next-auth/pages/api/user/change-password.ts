// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { getClient } from 'utils'

type Data = {
  name: string
}
interface UserDB {
  id?: string
  email: string
  password: string
  date: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // must be GET req.
  if (req.method !== 'POST') {
    res.status(200).json({ name: 'change password GET req' })
    return
  }

  const { password, email, newPassword, id } = req.body
  //find doc
  const client = getClient()
  try {
    await client.connect()
    const userCollection = client.db().collection('users')
    // null or object of user
    const user: UserDB | null = await userCollection.findOne({ email: email })
    console.log(user)
    if (user) {
      // check if password match
      const isPasswordValid = bcrypt.compareSync(password, user.password)
      if (isPasswordValid) {
        console.log(isPasswordValid)

        res.status(200).json({ name: 'ok to change password' })
        return
      } else {
        //password did not match
        res.status(401).json({ name: 'password did not match' })
        return
      }
    } else {
      // user not found
      res.status(200).json({ name: 'user not found, change password' })
      return
    }

    res.status(200).json({ name: 'change password' })
    return
  } catch (e) {
    console.error(e)
    return null
  } finally {
    await client.close()
  }
}
