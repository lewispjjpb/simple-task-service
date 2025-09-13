import { JSX } from 'react';
import { ITaskList } from '@/types/tasks';
import { Task } from '@/app/components/tasks/Task';
``;
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface TaskListProps {
  id: string;
  taskList: ITaskList;
}

export const TaskList = ({ id, taskList }: TaskListProps): JSX.Element => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Typography component="span">{id}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {taskList.map((task) => {
          return <Task key={task.id} {...task} />;
        })}
      </AccordionDetails>
    </Accordion>
  );
};
