import {JSX, useContext, useState} from 'react';
import {Card, CardContent, Chip, CardActionArea, Typography, Button, Box} from "@mui/material";
import {EditTaskModal} from "@/app/components/tasks/EditTaskModal";
import { ITask } from "@/types/tasks";
import {TasksContext} from "@/app/context/TasksContext";
import {Grid} from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';

export const  Task = (task: ITask):JSX.Element => {
  const {setTaskToEdit} = useContext(TasksContext);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const openAndPopulateEditModal = () => {
    setTaskToEdit(task);
    setEditModalOpen(true);
  }

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
              <Grid size={2}>
                <Button
                  aria-label="Edit task"
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={openAndPopulateEditModal}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
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