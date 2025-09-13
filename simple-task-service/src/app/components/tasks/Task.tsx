import {JSX, useContext, useState} from 'react';
import {Card, CardContent, Chip, Typography, Tooltip, IconButton} from "@mui/material";
import {EditTaskModal} from "@/app/components/tasks/EditTaskModal";
import { ITask } from "@/types/tasks";
import {TasksContext} from "@/app/context/TasksContext";
import {Grid} from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const  Task = (task: ITask):JSX.Element => {
  const {setTaskToEdit, deleteTask} = useContext(TasksContext);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const openAndPopulateEditModal = () => {
    setTaskToEdit(task);
    setEditModalOpen(true);
  }

  const buttonSize = 1;
  return (
      <Card
        sx={{
          height: '100%',
          '&[data-active]': {
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: 'action.selectedHover',
            },
          },
          marginTop: 1,
        }}
      >
        <EditTaskModal open={editModalOpen} setClose={() => setEditModalOpen(false)}/>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={7}>
                <Typography variant="h5" component="div">
                  { task.name}
                </Typography>
              </Grid>
              <Grid size={3}>
                <Chip
                  label={task.completed}
                  color={task.completed === 'complete' ? 'success' : 'warning'}
                  sx={{
                    width: '100%',
                  }}
                />
              </Grid>
              <Grid size={buttonSize}>
                <Tooltip title={'edit task'}>
                <IconButton
                  aria-label="Edit task"
                  color="primary"
                  size="small"
                  onClick={openAndPopulateEditModal}
                >
                  <EditIcon />
                </IconButton >
                </Tooltip>
              </Grid>
              <Grid size={buttonSize}>
                <Tooltip title={'delete task'}>
                  <IconButton
                    aria-label="delete task"
                    color="primary"
                    size="small"
                    onClick={() => deleteTask(task.id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid size={12}>
                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
      </Card>
    )
}