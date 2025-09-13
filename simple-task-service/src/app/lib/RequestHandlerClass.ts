//this would be an .env value

export class RequestHandler {
  private headers;
  private route;
  constructor(route:string) {
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Content-Encoding': 'gzip',
    };
    this.route = `$/tasks${route}`;
  }

  async getTasks<T,>():Promise<T> {
    try {
      const response = await fetch(this.route, {
        method: 'GET',
        headers: {...this.headers},
      });
      const tasks = await response.json();
      return tasks;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async saveTasks(tasks):JSON {
    try {
      const response = await fetch(this.route, {
        method: 'POST',
        headers: {...this.headers},
        body: JSON.stringify(tasks)
      });
      const savedTasks = await response.json();
      return savedTasks;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

}