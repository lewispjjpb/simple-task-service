import {Collection, MongoClient} from 'mongodb';
import {ITask} from "@/types/tasks";

    console.debug(process.env.MONGO_URI)
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

  async getTasks<T>(userId:string):Promise<T> {
    try {
    const query = {
      'userId': userId
    }
    const collection = await this.getCollection('tasks');
    const tasks = await collection.find(query).toArray();
    return tasks as T;
    } catch (e) {
      console.error(e);
      throw new Error('could not get tasks');
    } finally {
      await this.disconnectFromClient();
    }
  }

  async saveTasks(task:ITask, userId:string):Promise<any> {
    try {
      const collection = await this.getCollection('tasks');
      const query = {
        id: task.id,
        userId: userId
      }

      const { _id, ...taskWithoutId } = task;
      const update = {
        $set: {...taskWithoutId}
      }
      const options = {upsert: true};
      const result = await collection.updateOne(query, update, options);
      return result;
    } catch (e) {
      console.error(e);
      throw new Error('could not save tasks');
    } finally {
      await this.disconnectFromClient();
    }
  }

  async deleteTask(taskId:string):Promise<any> {
    try {
      const collection = await this.getCollection('tasks');
      const query = {
        id: taskId
      }
      const result = await collection.deleteMany(query);
      return result;
    } catch (e) {
      console.error(e);
      throw new Error('could not delete tasks');
    } finally {
      await this.disconnectFromClient();
    }
  }
}