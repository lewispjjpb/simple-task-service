import { useContext, ChangeEvent } from 'react';
import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Stack,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import { TasksContext } from '@/app/context/TasksContext';
import { BasicModal } from '@/app/components/shared/BasicModal';

interface TaskModalProps {
  open: boolean;
  setClose: () => void;
}

export const EditTaskModal = ({ open, setClose }: TaskModalProps) => {
  const { editingTask, editTaskProperty, saveTask, updateAlertSettings } =
    useContext(TasksContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    editTaskProperty(name, value);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const name = event.target.name as string;
    const value = event.target.value as string;
    editTaskProperty(name, value);
  };

  const nameError = editingTask.name.length === 0;

  const content = (
    <Box>
      <Stack spacing={3}>
        <TextField
          fullWidth
          name="name"
          label="Task Name"
          value={editingTask.name}
          onChange={handleInputChange}
          required
          error={nameError}
          helperText={nameError ? 'Task name is required' : ''}
        />

        <TextField
          fullWidth
          name="description"
          label="Description"
          multiline
          rows={4}
          value={editingTask.description}
          onChange={handleInputChange}
        />

        <TextField
          fullWidth
          name="bucket"
          label="Bucket"
          value={editingTask.bucket}
          onChange={handleInputChange}
        />

        <FormControl fullWidth>
          <InputLabel id="completion-status-label">Status</InputLabel>
          <Select
            labelId="completion-status-label"
            name="completed"
            value={editingTask.completed}
            label="Status"
            onChange={handleSelectChange}
          >
            <MenuItem value="incomplete">Incomplete</MenuItem>
            <MenuItem value="complete">Complete</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={setClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (!editingTask.name) {
                updateAlertSettings({
                  open: true,
                  message: 'Task name is required',
                  severity: 'error',
                });
                return;
              }
              saveTask();
              setClose();
            }}
          >
            Save
          </Button>
        </Box>
      </Stack>
    </Box>
  );

  return <BasicModal open={open} setClose={setClose} content={content} />;
};
