"use client";
import {createContext, JSX, useContext, useEffect, useState} from 'react';
import { ITaskContext, AlertSettings} from "@/types/taskContextDefinition";
import {ITaskList, ITask} from "@/types/tasks";
import {loadFromLocalStorage, saveToLocalStorage} from "@/app/lib/localStorageHandlers";
import {BasicAlert} from "@/app/components/shared/BasicAlert";
import {RequestHandler} from "@/app/lib/RequestHandlerClass";
import {UserContext} from "@/app/context/UserContext";
import CircularProgress from '@mui/material/CircularProgress';

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
  const {userId} = useContext(UserContext)
  const [tasks, setTasks] = useState<ITaskList>([]);
  const [editingTask, setEditingTask] = useState<ITask>(initialEditingTask);
  const [alertSettings, setAlertSettings] = useState<AlertSettings>(initialAlertSettings);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      loadTasksFromStorage()
    }
  },[userId])

  const loadTasksFromStorage = async ():Promise<void> => {
    try {
      setPageLoading(true);
    // const taskList:ITaskList = await loadFromLocalStorage('tasks');
      const request = new RequestHandler(`${userId}/load-tasks`);
      const taskList:ITaskList = await request.getTasks<ITaskList>();

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
    } finally {
      setPageLoading(false);
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

  const saveTask = async (taskId: ITask['id']) => {
    try {

    // const task = tasks?.find(task => task.id === taskId);
    // if (task) {
    //   //replace existing task with updated task
    //   // const updatedTasks = tasks.map(task => task.id === taskId ? editingTask : task)
    //   // saveToLocalStorage('tasks', updatedTasks)
    //   setEditingTask(initialEditingTask);
    //   const request = new RequestHandler(`${userId}/save-tasks`);
    //   const success = await request.saveTasks(task);
    //   if (!success) {
    //     throw new Error('could not save tasks');
    //   }
    //   updateAlertSettings({
    //     open: true,
    //     message: 'Task updated successfully',
    //     severity: 'success',
    //   })
    // } else {
      // add new task
      if (!editingTask.bucket) {
        editingTask.bucket = 'uncategorized';
      }
      // const updatedTasks = [...tasks, editingTask];
      // saveToLocalStorage('tasks', updatedTasks);
      setEditingTask(initialEditingTask);
      const request = new RequestHandler(`${userId}/save-tasks`);
      const success = await request.saveTasks(editingTask);
      if (!success) {
        throw new Error('could not save tasks');
      }
      updateAlertSettings({
        open: true,
        message: 'Task added successfully',
        severity: 'success',
      })

    } catch (e) {
      updateAlertSettings({
        open: true,
        message: 'Error saving task',
        severity: 'error',
      })
      console.error(e);
    } finally {
      loadTasksFromStorage();
    }
  }

  const deleteTask = async (taskId: ITask['id']) => {
    try {
    if (tasks.find(task => task.id === taskId)) {

      // saveToLocalStorage('tasks', updatedTasks);
      const request = new RequestHandler(`${userId}/delete-task`);
      const response = await request.deleteTask(taskId);
      if (response.status !== 204) {
        throw new Error('could not delete task');
      }
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
      } finally {
        loadTasksFromStorage();
      }

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
    alertSettings,
  }
  return <TasksContext.Provider value={contextValues}>
    <BasicAlert open={alertSettings.open} message={alertSettings.message} severity={alertSettings.severity} handleClose={closeAlert}/>
    {pageLoading ? <CircularProgress /> : children}
  </TasksContext.Provider>
}