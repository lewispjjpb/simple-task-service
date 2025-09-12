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

export interface TaskList {
  [id: string]: ITask
}

export type CompletionStatus = "not started" | "incomplete" | "complete";