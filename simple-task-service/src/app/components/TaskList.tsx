import {JSX, useEffect, useContext, useState} from 'react';
import { ITask, ITaskList} from "@/types/tasks";
import {TasksContext} from "@/app/context/TasksContext";
import {Task} from "@/app/components/Task";``
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


interface TaskListProps {
  id: string;
  taskList: ITaskList;
}

export const TaskList = ({id, taskList}: TaskListProps):JSX.Element => {

console.debug({id, taskList})



  return (
    <Accordion>
      <AccordionSummary>
        <Typography component="span">{id}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {taskList.map(task => {
          console.debug({task})
          return <Task key={task.id} {...task}/>
        })}
      </AccordionDetails>
    </Accordion>
  )
}