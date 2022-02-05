import { MongoClient } from 'mongodb'
import { uri } from './private/avoid'

const item = {
  reviewer_id: 88739335,
  rating: 4.5,
  reviewer: 'Brandon Sims',
  text: 'Sci-fi flick from Ridley Scott that updates the old Robinso...',
}
async function run() {
  const client = new MongoClient(uri)
  try {
    // Connect the client to the server
    await client.connect()
    // Establish and verify connection
    // await client.db('video').command({ ping: 1 })
    console.log('Connected successfully to server')

    // await listDatabases(client)

    // await listCollection(client)

    // await addItemToCollection(client, item)

    await getCollection(client, 'reviews')
  } catch (e) {
    console.error(e)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.error)

async function listDatabases(client: MongoClient): Promise<void> {
  const list = await client.db().admin().listDatabases()
  for (const db of list.databases) {
    console.log(db.name)
  }
}

async function listCollection(client: MongoClient): Promise<void> {
  const video = await client.db('video').collections()

  // const col = await client.db('video').collection('reviews')
  console.log('video', video)
  // console.log('col', col)
}

async function addItemToCollection(client: MongoClient, item: any) {
  const res = await client.db('video').collection('reviews').insertOne(item)
  console.log(res)
}

async function getCollection(client: MongoClient, name: string) {
  // const client = new MongoClient(uri) ////not needed if 'client' passed in.
  // await client.connect()
  const allValues = await client.db('video').collection(name).find().toArray()
  console.log(allValues) // array of complete collection
}
