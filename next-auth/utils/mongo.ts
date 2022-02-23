//@ts-ignore
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

export function getClient(): MongoClient {
  return new MongoClient(process.env.MONGODB as string, {
    useUnifiedTopology: true,
  })
}

export const createPasswordHash = (
  b: typeof bcrypt,
  password: string
): string => {
  const salt = b.genSaltSync(12)
  return b.hashSync(password, salt)
}
