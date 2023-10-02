import { MongoClient } from 'mongodb'


let client: MongoClient;



async function dbConnect() {
  if (!client) {
    if (!process.env.DB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined...')
    }
    client = new MongoClient(process.env.DB_URI);
    await client?.connect();
  }
  return { db: client.db('t-finder'), client };
}

export default dbConnect;