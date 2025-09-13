export interface ITask {
  id: string;
  name: string;
  description: string;
  completed: CompletionStatus;
  /**
   * @bucket determines which list task is assigned to
   */
  bucket: string;
  _id?: string; //only relevant to mongo
}

export type ITaskList = ITask[]

export type CompletionStatus = "incomplete" | "complete";