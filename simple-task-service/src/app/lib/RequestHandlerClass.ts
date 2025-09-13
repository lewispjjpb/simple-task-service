import { ITask, ITaskList } from '@/types/tasks';

export class RequestHandler {
  private headers;
  private route;
  constructor(route: string) {
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Content-Encoding': 'gzip',
    };
    this.route = `/tasks/api/tasks/${route}`;
  }

  async getTasks<T>(): Promise<T> {
    try {
      const response = await fetch(this.route, {
        method: 'GET',
        headers: { ...this.headers },
      });
      const tasks = await response.json();
      return tasks;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async saveTasks(task: ITask): Promise<Response> {
    try {
      const response = await fetch(this.route, {
        method: 'POST',
        headers: { ...this.headers },
        body: JSON.stringify(task),
      });
      const savedTasks = await response.json();
      return savedTasks;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async deleteTask(taskId: string): Promise<Response> {
    try {
      const response = await fetch(`${this.route}`, {
        method: 'DELETE',
        headers: { ...this.headers },
        body: JSON.stringify(taskId),
      });
      const deletedTask = await response.json();
      return deletedTask;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
