import { MongoClient } from 'mongodb'

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string
const client = new MongoClient(uri)

async function run() {
  try {
    // Connect the client to the server
    await client.connect()
    // Establish and verify connection
    await client.db('video').command({ ping: 1 })
    console.log('Connected successfully to server')
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)
