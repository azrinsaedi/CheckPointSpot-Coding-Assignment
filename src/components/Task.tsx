import React from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import TaskList from './TaskList';
import { useTaskContext } from '../context/useTaskContext';

const Task: React.FC<{
  handleAddTask: (newTaskName: string, newTaskDescription: string) => void;
  handleToggle: (id: string) => void;
}> = ({ handleAddTask, handleToggle }) => {
  const {
    filteredTasks,
    filter,
    setFilter,
    tasks,
    newTaskName,
    setNewTaskName,
    newTaskDescription,
    setNewTaskDescription,
  } = useTaskContext();

  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant='h5' fontWeight='bold' align='center' gutterBottom>
          Add New Task
        </Typography>

        <Box display='flex' flexDirection='column' gap={2} mb={2}>
          <TextField
            label='Task Name'
            variant='outlined'
            fullWidth
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <TextField
            label='Task Description'
            variant='outlined'
            fullWidth
            multiline
            rows={2}
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <Box display='flex' justifyContent='center'>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                handleAddTask(newTaskName, newTaskDescription);
                setNewTaskName('');
                setNewTaskDescription('');
              }}
              sx={{ width: '150px' }}
            >
              Add Task
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
          <Typography variant='h5' fontWeight='bold'>
            Task List
          </Typography>
          <FormControl variant='outlined' sx={{ minWidth: 200 }}>
            <InputLabel>Status Filter</InputLabel>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)} label='Status Filter'>
              <MenuItem value='ALL'>All</MenuItem>
              <MenuItem value='IN PROGRESS'>In Progress</MenuItem>
              <MenuItem value='DONE'>Done</MenuItem>
              <MenuItem value='COMPLETED'>Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {tasks.length === 0 ? (
          <Typography variant='h6' color='textSecondary' align='center' sx={{ py: 3 }}>
            No tasks yet. Add a new task!
          </Typography>
        ) : filteredTasks.length === 0 ? (
          <Typography variant='body1' color='textSecondary' align='center' sx={{ py: 3 }}>
            No tasks found for selected status.
          </Typography>
        ) : (
          <TaskList tasks={filteredTasks} handleToggle={handleToggle} />
        )}
      </Paper>
    </Container>
  );
};

export default Task;
