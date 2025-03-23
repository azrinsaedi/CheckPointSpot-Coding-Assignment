import React from 'react';
import { Container, Box, TextField, Button, Paper, Typography, Divider } from '@mui/material';
import TaskList from './TaskList';
import { TaskProps } from '../types';

const Task: React.FC<TaskProps> = ({
  tasks,
  newTaskName,
  newTaskDescription,
  setNewTaskName,
  setNewTaskDescription,
  handleAddTask,
  handleToggle,
}) => {
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
            <Button variant='contained' color='primary' onClick={handleAddTask} sx={{ width: '150px' }}>
              Add Task
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography variant='h5' fontWeight='bold' align='center' gutterBottom>
          Task List
        </Typography>

        {tasks.length === 0 ? (
          <Typography variant='h6' color='textSecondary' align='center'>
            No tasks yet. Add a new task!
          </Typography>
        ) : (
          <TaskList tasks={tasks} handleToggle={handleToggle} />
        )}
      </Paper>
    </Container>
  );
};

export default Task;
