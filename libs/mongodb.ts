import { MongoClient, MongoClientOptions } from 'mongodb'

const mongoUrl =
  'mongodb+srv://hoanganleba:megolio1998@cluster0.npceu.mongodb.net?retryWrites=true&w=majority'

const dbName = 'homework'

const connect = async () => {
  const options = {
    useNewUrlParser: true
  } as MongoClientOptions
  const mongoClient: MongoClient = new MongoClient(mongoUrl, options)
  const client: MongoClient = await mongoClient.connect()

  const closeDb = () => {
    return client.close()
  }

  try {
    return { db: client.db(dbName), closeDb }
  } catch (err) {
    throw err
  }
}

export default { connect }
