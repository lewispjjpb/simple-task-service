import { JSX, useState } from 'react';
import {Card, CardContent, Chip, CardActionArea, Typography, Button} from "@mui/material";
import {BasicModal} from "@/app/components/TaskEditModal";
import { ITask } from "@/types/tasks";
import {openTask} from "@/app/lib/taskManagement";

export const  Task = (task: ITask):JSX.Element => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const editContent = <div>content</div>

  return (
    <>
      <Card>
        {editModalOpen && <BasicModal open={editModalOpen} content={editContent} setClose={() => setEditModalOpen(false)}/>}
        <CardActionArea
          sx={{
            height: '100%',
            '&[data-active]': {
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: 'action.selectedHover',
              },
            },
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              { task.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
            <Chip label={task.completed} color={task.completed === 'complete' ? 'success' : 'warning'} />
            <Button
              aria-label="Edit task"
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => setEditModalOpen(true)}
            >
              Edit
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
    )
}