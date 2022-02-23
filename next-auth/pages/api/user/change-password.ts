// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { getClient, createPasswordHash } from 'utils'
import { getSession } from 'next-auth/react'

type Data = {
  msg: string
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
  if (req.method !== 'PATCH') {
    res.status(401).json({ msg: 'change password problem with request' })
    return
  }

  const session = await getSession({ req })
  if (!session) {
    res.status(401).json({ msg: 'change password not authorized' })
    return
  }

  const { password, newPassword } = req.body
  //find doc
  const client = getClient()
  try {
    await client.connect()
    const usersCollection = client.db().collection('users')
    // null or object of user
    const userDB: UserDB | null = await usersCollection.findOne({
      email: session?.user?.email,
    })

    if (userDB) {
      // check if password match
      const isPasswordValid = bcrypt.compareSync(password, userDB.password)
      if (isPasswordValid) {
        const newHash = createPasswordHash(bcrypt, newPassword)

        //returns 1 or 0 if no match
        const { matchedCount, modifiedCount } =
          await usersCollection.updateOne<UserDB>(
            { email: session?.user?.email },
            { $set: { password: newHash } }
          )

        res.status(201).json({ msg: 'password changed!' })
        return
      } else {
        //password did not match
        res.status(403).json({ msg: 'invalid password' })
        return
      }
    } else {
      // user not found
      res.status(200).json({ msg: 'user not found, change password' })
      return
    }
  } catch (e) {
    console.error(e)
    return null
  } finally {
    await client.close()
  }
}
