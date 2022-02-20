import { MongoClient } from 'mongodb'

export const client = new MongoClient(process.env.MONGODB as string, {
  useUnifiedTopology: true,
})

export async function getCollection(client: MongoClient, collection: string) {
  try {
    await client.connect()
    // array of objects. Complete collection
    return await client.db().collection(collection).find().toArray()
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

export async function listCollections(client: MongoClient) {
  try {
    await client.connect()
    return await client.db().listCollections().toArray()
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

export async function listDatabases(client: MongoClient): Promise<void> {
  try {
    await client.connect()
    const list = await client.db().admin().listDatabases()
    for (const db of list.databases) {
      console.log(db.name)
    }
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}

export async function addItemToCollection(
  client: MongoClient,
  collection: string,
  item: any
): Promise<Boolean> {
  let noProblems = false
  try {
    await client.connect()
    const { message, result } = await client
      .db()
      .collection(collection)
      .insertOne(item)
    // console.log('res', !!result.ok)
    // console.log(Buffer.from(message?.data).toString())

    noProblems = !!result?.ok // true / false
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
  return noProblems
}

export async function getQuery(
  client: MongoClient,
  collection: string,
  query: { [k: string]: string }
) {
  try {
    await client.connect()
    // array of objects. Complete collection
    return await client.db().collection(collection).find(query).toArray()
  } catch (e) {
    console.error(e)
  } finally {
    await client.close()
  }
}
