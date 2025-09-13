'use client';
import { JSX, useContext, useEffect, useState } from 'react';
import { TaskList } from '@/app/components/tasks/TaskList';
import { ITaskList } from '@/types/tasks';
import { TasksContext } from '@/app/context/TasksContext';
import { Button, Grid, Typography } from '@mui/material';
import { EditTaskModal } from '@/app/components/tasks/EditTaskModal';

interface ITaskGroup {
  [name: string]: ITaskList;
}

export const TaskTracker = (): JSX.Element => {
  const { tasks, setTaskToEdit } = useContext(TasksContext);
  const [listGroups, setListGroups] = useState<ITaskGroup>({});
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);

  //when loading, organize existing tasks into their groups
  useEffect(() => {
    if (tasks) {
      organizeExistingTasks().catch((error) => {
        //better solution: create error message class to capture stack trace
        console.error('Error organizing tasks:', error);
      });
    }
  }, [tasks]);

  //creates distinct objects for each list of tasks
  const organizeExistingTasks = async () => {
    const groups: ITaskGroup = {} as ITaskGroup;
    //iterate through tasks and group them into lists by bucket
    for (const task of tasks) {
      if (!groups[task.bucket]) {
        groups[task.bucket] = [];
      }
      groups[task.bucket].push(task);
    }
    setListGroups(groups);
  };

  const addTask = () => {
    //add new task to list
    setNewTaskModalOpen(true);
    setTaskToEdit({
      id: crypto.randomUUID(),
      name: '',
      description: '',
      bucket: '',
      completed: 'incomplete',
    });
  };

  const addTaskButtonText =
    tasks.length === 0 ? 'Add First Task' : 'Add Another Task';

  return (
    <>
      <EditTaskModal
        setClose={() => setNewTaskModalOpen(false)}
        open={newTaskModalOpen}
      />
      <Grid
        container
        spacing={1}
        maxWidth={1200}
        justifySelf="center"
        minWidth={600}
        margin={2}
      >
        <Grid size={9.5} alignSelf={'center'}>
          <Typography variant="h4" component="div">
            Track Your Tasks Below
          </Typography>
        </Grid>
        <Grid size={2.5} alignSelf={'center'}>
          <Button
            size="small"
            aria-label={'Add a task'}
            variant="contained"
            onClick={addTask}
            fullWidth={true}
          >
            {addTaskButtonText}
          </Button>
        </Grid>
        {Object.entries(listGroups).map(([bucket, tasks]) => (
          <Grid
            key={bucket}
            size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
            direction="row"
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TaskList id={bucket} taskList={tasks} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
