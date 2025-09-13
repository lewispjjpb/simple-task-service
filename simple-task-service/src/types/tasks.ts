export interface ITask {
  id: number;
  name: string;
  description: string;
  completed: CompletionStatus;
  /**
   * @bucket determines which list task is assigned to
   */
  bucket: string;
}

export type ITaskList = ITask[]

export type CompletionStatus = "incomplete" | "complete";