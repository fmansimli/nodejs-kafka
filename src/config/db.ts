import { MongoClient } from "mongodb";

const URL = String(process.env.MONGO_URL);

const client = new MongoClient(URL, { minPoolSize: 5 });

class MyDatabase {
  static getDb(dbname?: string) {
    return client.db(dbname || process.env.DB_NAME);
  }

  static async close() {
    await client.close();
  }

  static ping = async (dbname?: string) => {
    await client.db(dbname || process.env.DB_NAME).command({ ping: 1 });
  };
}

export default MyDatabase;
