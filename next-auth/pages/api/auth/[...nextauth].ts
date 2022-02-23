import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
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
  pages: {
    signIn: '/auth/signup',
    error: '/auth/error',
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@email.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        const client = getClient()
        try {
          await client.connect()
          const usersCollection = client.db().collection('users')
          const userDB = await usersCollection.findOne({
            email: req?.body?.email,
          })
          // tells next auth to respond with a failure
          if (!userDB) {
            throw new Error('User not found!')
          }
          const isPasswordCorrect = bcrypt.compareSync(
            req?.body?.password,
            userDB.password
          )
          if (!isPasswordCorrect) {
            throw new Error('Could not log in!')
          }
          // all checks passed, return something to encode into web token.
          return { id: userDB._id, email: userDB.email }
        } catch (e) {
          console.error(e)
          return null
        } finally {
          await client.close()
        }
      },
    }),
  ],
})
