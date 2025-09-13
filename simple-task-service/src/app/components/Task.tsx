import { JSX } from 'react';
import { Card }  from "@mui/material";
import {Box} from '@mui/material';
import {CardContent} from '@mui/material';
import {Typography} from '@mui/material';
import {CardActionArea} from '@mui/material';
import { ITask } from "@/types/tasks";

export const  Task = (task: ITask):JSX.Element => {

  return (
      <Card>
        { task.name}
      </Card>
    )
}