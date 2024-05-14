import { MongoClient } from 'mongodb';

const options: any = { useNewUrlParser: true };
let connectDB: Promise<MongoClient>;

const URL = `${process.env.MONGODB_URL}`;

// MongoDB URL 에러처리
if (!URL) {
  throw new Error('MongoDB URL Error');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(URL, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(URL, options).connect();
}

export { connectDB };
