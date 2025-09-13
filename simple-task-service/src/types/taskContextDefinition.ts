import { ITaskList, ITask } from '@/types/tasks';

export interface ITaskContext {
  tasks: ITaskList;
  setTaskToEdit: (task: ITask) => void;
  editTaskProperty: (key: string, value: string) => void;
  editingTask: ITask;
  saveTask: () => void;
  deleteTask: (taskId: ITask['id']) => void;
  alertSettings: AlertSettings;
  updateAlertSettings: (alertSettings: AlertSettings) => void;
}

export interface AlertSettings {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}
