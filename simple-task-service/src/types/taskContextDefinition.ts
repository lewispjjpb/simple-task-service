import {ITaskList, ITask} from "@/types/tasks";

export interface ITaskContext {
  tasks: ITaskList,
  setTaskToEdit: (task: ITask) => void,
  editTaskProperty: (key: string, value: string) => void,
  editingTask: ITask,
  saveTask: (taskId: ITask['id']) => void,
}