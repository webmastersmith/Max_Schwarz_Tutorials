import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { getClient } from 'utils'
import bcrypt from 'bcryptjs'

interface User {
  email: string
  password: string
}

interface UserDB {
  id?: string
  email: string
  password: string
  date: string
}

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials: User) {
        const client = await getClient()
        try {
          await client.connect()
          const usersCollection = client.db().collection<User[]>('users')
          const userDB = await usersCollection.findOne({
            email: credentials.email,
          })
          // tells next auth to respond with a failure
          if (!userDB) {
            throw new Error('User not found!')
          }
          const isPasswordCorrect = bcrypt.compareSync(
            credentials.password,
            userDB.password
          )
          if (!isPasswordCorrect) {
            throw new Error('Could not log in!')
          }
          // all checks passed, return something to encode into web token.
          return { email: userDB.email }
        } catch (e) {
          console.error(e)
        } finally {
          await client.close()
        }
      },
    }),
  ],
})
