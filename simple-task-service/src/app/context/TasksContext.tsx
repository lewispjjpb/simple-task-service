"use client";
import {createContext, JSX, useEffect, useState} from 'react';
import { ITaskContext} from "@/types/taskContextDefinition";
import {ITaskList, ITask} from "@/types/tasks";
import {tempTasks} from "../../../mockdata/temptasks";
import {loadFromLocalStorage, saveToLocalStorage} from "@/app/lib/localStorageHandlers";

export const TasksContext = createContext<ITaskContext>({} as ITaskContext);

const initialEditingTask:ITask = {
  id: '',
  name: '',
  description: '',
  completed: 'incomplete',
  bucket: '',
}

export const TasksContextProvider = ({children}: {children:JSX.Element}) => {
  const [tasks, setTasks] = useState<ITaskList>([]);
  const [editingTask, setEditingTask] = useState<ITask>(initialEditingTask);

  useEffect(() => {
    loadTasksFromStorage()
  },[])

  const loadTasksFromStorage = async ():Promise<void> => {
    //temp tasks
    const taskList:ITaskList = await loadFromLocalStorage('tasks');
    setTasks(taskList || []);
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
    const task = tasks?.find(task => task.id === taskId);
    if (task) {
      //replace existing task with updated task
      const updatedTasks = tasks.map(task => task.id === taskId ? editingTask : task)
      setTasks(updatedTasks);
      saveToLocalStorage('tasks', updatedTasks)
      setEditingTask(initialEditingTask);
    } else {
      // add new task
      if (!editingTask.bucket) {
        editingTask.bucket = 'uncategorized';
      }
      const updatedTasks = [...tasks, editingTask];
      setTasks(updatedTasks);
      saveToLocalStorage('tasks', updatedTasks);
      setEditingTask(initialEditingTask);
    }
  }

  const deleteTask = (taskId: ITask['id']) => {
    //check id exists in tasks
    if (tasks.find(task => task.id === taskId)) {
      //remove task from tasks
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      saveToLocalStorage('tasks', updatedTasks);
    }
  }

  const contextValues:ITaskContext = {
    tasks,
    editTaskProperty,
    setTaskToEdit,
    editingTask,
    saveTask,
    deleteTask,
  }
  return <TasksContext.Provider value={contextValues}>
    {children}
  </TasksContext.Provider>
}