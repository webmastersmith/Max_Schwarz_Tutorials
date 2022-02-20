import type { NextApiRequest, NextApiResponse } from 'next'
import { client, addItemToCollection, getQuery } from 'utils'
import bcrypt from 'bcryptjs'

type Data = {
  msg: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    // console.log(req.body)
    // const { email, password } = JSON.parse(req.body)

    // const salt = bcrypt.genSaltSync(12)
    // console.log('salt', salt)
    // const hash = bcrypt.hashSync(password, salt)
    // console.log('hash', hash)
    // console.log('password good', bcrypt.compareSync(password, hash))

    // const bool = await addItemToCollection(client, 'users', {
    //   email: 'bob@gmail.com',
    //   password: hash,
    //   date: new Date().toISOString(),
    // })
    // console.log('bool', bool)

    console.log(await getQuery(client, 'users', { email: 'bob2@gmail.com' }))

    res.status(201).json({ msg: 'all good' })
  } else {
    res.status(200).json({ msg: 'GET request' })
  }
}
