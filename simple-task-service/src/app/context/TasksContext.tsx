"use client";
import {createContext, JSX, useEffect, useState} from 'react';
import { ITaskContext} from "@/types/taskContextDefinition";
import {ITaskList, ITask} from "@/types/tasks";
import {tempTasks} from "../../../mockdata/temptasks";

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
    const taskList:ITaskList = await tempTasks;
    setTasks(taskList);
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
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      //replace existing task with updated task
      setTasks(tasks.map(task => task.id === taskId ? editingTask : task));
      setEditingTask(initialEditingTask);
    }
  }

  const contextValues:ITaskContext = {
    tasks,
    editTaskProperty,
    setTaskToEdit,
    editingTask,
    saveTask,
  }
  return <TasksContext.Provider value={contextValues}>
    {children}
  </TasksContext.Provider>
}