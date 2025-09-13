"use client";
import {createContext, JSX, useEffect, useState} from 'react';
import { ITaskContext, AlertSettings} from "@/types/taskContextDefinition";
import {ITaskList, ITask} from "@/types/tasks";
import {loadFromLocalStorage, saveToLocalStorage} from "@/app/lib/localStorageHandlers";
import {BasicAlert} from "@/app/components/shared/BasicAlert";

export const TasksContext = createContext<ITaskContext>({} as ITaskContext);


const initialEditingTask:ITask = {
  id: '',
  name: '',
  description: '',
  completed: 'incomplete',
  bucket: '',
}

const initialAlertSettings:AlertSettings = {
  open: false,
  message: '',
  severity: 'success',
}

export const TasksContextProvider = ({children}: {children:JSX.Element}) => {
  const [tasks, setTasks] = useState<ITaskList>([]);
  const [editingTask, setEditingTask] = useState<ITask>(initialEditingTask);
  const [alertSettings, setAlertSettings] = useState<AlertSettings>(initialAlertSettings);



  useEffect(() => {
    loadTasksFromStorage()
  },[])

  const loadTasksFromStorage = async ():Promise<void> => {
    try {
    const taskList:ITaskList = await loadFromLocalStorage('tasks');
    setTasks(taskList || []);
      updateAlertSettings({
        open: true,
        message: 'Tasks loaded successfully',
        severity: 'success',
      })
    } catch (e) {
      updateAlertSettings({
        open: true,
        message: 'Error loading tasks',
        severity: 'error',
      })
      console.error(e);
    }
  }

  const editTaskProperty = (key: string, value: string | number):void => {
    setEditingTask({
      ...editingTask,
      [key]: value
    });
  }

  const setTaskToEdit = (task: ITask):void => {
    setEditingTask(task);
  }

  const saveTask = (taskId: ITask['id']) => {
    try {

    const task = tasks?.find(task => task.id === taskId);
    if (task) {
      //replace existing task with updated task
      const updatedTasks = tasks.map(task => task.id === taskId ? editingTask : task)
      setTasks(updatedTasks);
      saveToLocalStorage('tasks', updatedTasks)
      setEditingTask(initialEditingTask);
      updateAlertSettings({
        open: true,
        message: 'Task updated successfully',
        severity: 'success',
      })
    } else {
      // add new task
      if (!editingTask.bucket) {
        editingTask.bucket = 'uncategorized';
      }
      const updatedTasks = [...tasks, editingTask];
      setTasks(updatedTasks);
      saveToLocalStorage('tasks', updatedTasks);
      setEditingTask(initialEditingTask);
      updateAlertSettings({
        open: true,
        message: 'Task added successfully',
        severity: 'success',
      })
    }
    } catch (e) {
      updateAlertSettings({
        open: true,
        message: 'Error saving task',
        severity: 'error',
      })
      console.error(e);
    }
  }

  const deleteTask = (taskId: ITask['id']) => {
    try {
    if (tasks.find(task => task.id === taskId)) {
      //remove task from tasks
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      saveToLocalStorage('tasks', updatedTasks);
      setAlertSettings({
        open: true,
        message: 'Task deleted successfully',
        severity: 'success',
      })
    }
    } catch (e) {
      updateAlertSettings({
        open: true,
        message: 'Error deleting task',
        severity: 'error',
      })
      console.error(e);
      }
    //check id exists in tasks
  }

  const closeAlert = () => {
    setAlertSettings(initialAlertSettings)
  }

  const updateAlertSettings = (alertSettings:AlertSettings) => {
    setAlertSettings(alertSettings);
  }

  const contextValues:ITaskContext = {
    tasks,
    editTaskProperty,
    setTaskToEdit,
    editingTask,
    saveTask,
    deleteTask,
    updateAlertSettings,
  }
  return <TasksContext.Provider value={contextValues}>
    <BasicAlert open={alertSettings.open} message={alertSettings.message} severity={alertSettings.severity} handleClose={closeAlert}/>
    {children}
  </TasksContext.Provider>
}