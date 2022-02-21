//@ts-ignore
import { MongoClient } from 'mongodb'

export async function getClient(): Promise<MongoClient> {
  return new MongoClient(process.env.MONGODB as string, {
    useUnifiedTopology: true,
  })
}
