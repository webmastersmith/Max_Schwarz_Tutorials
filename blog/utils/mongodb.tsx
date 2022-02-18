import { MongoClient } from 'mongodb'

interface MongoType {
  email: string
  message: string
  fullName: string
}
export async function mongoRun(response: MongoType) {
  const client = new MongoClient(process.env.MONGODB as string)
  try {
    // Connect the client to the server
    await client.connect()
    // console.log('Connected successfully to blog server')
    return await addItemToCollection(client, response)
  } catch (e) {
    console.error(e)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
// mongoRun().catch(console.error)

async function addItemToCollection(
  client: MongoClient,
  item: any
): Promise<Boolean> {
  const res = await client.db('blog').collection('comments').insertOne(item)
  return res.acknowledged
}
//await addItemToCollection(client, item)
//res: {
//   acknowledged: true,
//   insertedId: new ObjectId("61fdd4d52521bd1d05a7d97d")
// }
