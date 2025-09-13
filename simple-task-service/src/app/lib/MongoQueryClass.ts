import {Collection, MongoClient} from 'mongodb';

const mongoClient = new MongoClient(process.env.MONGO_URI || 'mongo string not found');

export class MongoQueryClass {
  private client:MongoClient;
  constructor() {
    this.client = mongoClient;
    this.connectToClient();
  }

  async connectToClient() {
    try {
      await this.client.connect();
    } catch (e) {
      console.error(e);
      throw new Error('could not connect to mongo client')
    }
  }

  async disconnectFromClient() {
    try {
      await this.client.close();
    } catch (e) {
      console.error(e);
      throw new Error('could not close mongo client')
    }
  }

  async getCollection(collectionName:string):Promise<Collection> {
    return this.client.db('tasks').collection(collectionName);
  }

  async getTasks(userId:string) {
    const query = {
      'userId': userId
    }
    const collection = await this.getCollection('tasks');
    const tasks = await collection.find(query).toArray();
    return tasks;
  }
}