import { MongoClient } from 'mongodb'

const uri = process.env.DB_URI

let client: MongoClient;
let clientPromise: Promise<MongoClient> | undefined;

if (!uri) {
  throw new Error('MONGODB_URI environment variable is not defined. Add Mongo URI to .env.local')
}

client = new MongoClient(uri);
clientPromise = client.connect();


export default clientPromise
