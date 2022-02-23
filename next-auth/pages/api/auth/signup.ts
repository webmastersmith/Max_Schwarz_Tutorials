import type { NextApiRequest, NextApiResponse } from 'next'
import { getClient, createPasswordHash } from 'utils'
import bcrypt from 'bcryptjs'

type Data = {
  msg: string
}

interface User {
  id?: string
  email: string
  password: string
  date: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    // GET request.
    res.status(400).json({ msg: 'Request Malformed' })
    return
  }

  // console.log(req.body)
  const { email, password } = JSON.parse(req.body)

  const client = await getClient()
  try {
    await client.connect()
    const userCollection = client.db<User[]>().collection<User>('users')

    // find if user exist.
    const userDB = await userCollection.findOne<User>({ email })

    // user does not exist, add them to db.
    if (!userDB) {
      const isUserCreated = await createUser(userCollection, email, password)
      // user was successfully added to db.
      if (isUserCreated) {
        res.status(201).json({ msg: 'User Created!' })
        return
        // problem with db response
      } else {
        res
          .status(503)
          .json({ msg: 'User Not Created, Please try again later.' })
        return
      }
    } else {
      //user already exist.
      res.status(422).json({ msg: 'User Already exist' })
      return
    }
    // else {
    //   // compare pw for match
    //   const isPasswordCorrect = bcrypt.compareSync(password, userDB.password)
    //   // password good
    //   if (isPasswordCorrect) {
    //     res.status(200).json({ msg: 'User Found!, pw good.' })
    //     return
    //     // user pw did not match.
    //   } else {
    //     res.status(401).json({ msg: 'Unauthorized' })
    //     return
    //   }
    // }
    // end userExist
  } catch (e) {
    console.error(e)
  } finally {
    client.close()
  }

  // something went wrong with response from db.
  res.status(503).json({ msg: 'Problem with database' })
  return
}

async function createUser(
  collection: any,
  email: string,
  password: string
): Promise<boolean> {
  const hash = createPasswordHash(bcrypt, password)
  return await collection.insertOne({
    email,
    password: hash,
    date: new Date().toISOString(),
  })
}
