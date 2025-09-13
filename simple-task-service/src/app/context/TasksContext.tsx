"use client";
import {createContext, JSX, useEffect, useState} from 'react';
import { ITaskContext} from "@/types/taskContextDefinition";
import {ITaskList} from "@/types/tasks";
import {tempTasks} from "../../../mockdata/temptasks";

export const TasksContext = createContext<ITaskContext>({});

export const TasksContextProvider = ({children}: {children:JSX.Element}) => {
  const  [tasks, setTasks] = useState<ITaskList>();

  useEffect(() => {
    loadTasksFromStorage()
  },[])

  const loadTasksFromStorage = async ():Promise<void> => {
    //temp tasks
    const taskList:ITaskList = await tempTasks;
    setTasks(taskList);
  }

  const contextValues = {
    tasks,
  }
  return <TasksContext.Provider value={contextValues}>
    {children}
  </TasksContext.Provider>
}