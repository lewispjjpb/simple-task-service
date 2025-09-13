"use client";
import {JSX, useContext, useEffect, useState} from 'react';
import  { TaskList} from "@/app/components/TaskList";
import {ITaskList} from "@/types/tasks";
import {TasksContext} from "@/app/context/TasksContext";

interface ITaskGroup {
  [name: string]: ITaskList;
}

export const TaskTracker = ():JSX.Element[] => {
  const { tasks } = useContext(TasksContext);
  const [listGroups, setListGroups] = useState<ITaskGroup>({});
  //when loading, organize existing tasks into their groups
  useEffect(() => {
    if (tasks) {
      organizeExistingTasks()
        .catch(error => {
        console.error('Error organizing tasks:', error);
      });
    }
  }, [tasks]);



  //creates distinct objects for each list of tasks
  const organizeExistingTasks = async () => {
    const groups:ITaskGroup = {} as ITaskGroup;
    //iterate through tasks and group them into lists by bucket
    for (const task of tasks) {
      if (!groups[task.bucket]) {
        groups[task.bucket] = [];
      }
      groups[task.bucket].push(task);
    }
    setListGroups(groups);
  }

  return Object.entries(listGroups).map(([bucket, tasks]) => <TaskList key={bucket} id={bucket} taskList={tasks} />)

}