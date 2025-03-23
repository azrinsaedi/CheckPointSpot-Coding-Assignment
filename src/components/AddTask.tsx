import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { AddTaskProps } from '../types';

const AddTask: React.FC<AddTaskProps> = ({
  newTaskName,
  setNewTaskName,
  newTaskDescription,
  setNewTaskDescription,
  parentTaskId,
  setParentTaskId,
  handleSubmit,
  error,
  setError,
}) => {
  return (
    <Box display='flex' justifyContent='center'>
      <Box
        component='form'
        onSubmit={handleSubmit}
        display='flex'
        flexDirection='column'
        gap={2}
        mb={2}
        maxWidth='sm'
        width='100%'
      >
        <Typography variant='h5' fontWeight='bold' align='center' gutterBottom>
          Add New Task
        </Typography>

        <TextField
          label='Task Name'
          variant='outlined'
          fullWidth
          required
          value={newTaskName}
          onChange={(e) => {
            setNewTaskName(e.target.value);
            setError(false);
          }}
          error={error}
          helperText={error ? 'Task name is required' : ''}
        />
        <TextField
          label='Task Description'
          variant='outlined'
          fullWidth
          multiline
          rows={2}
          value={newTaskDescription || ''}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <TextField
          label='Parent Task ID'
          variant='outlined'
          fullWidth
          value={parentTaskId}
          onChange={(e) => setParentTaskId(e.target.value)}
        />
        <Typography display='flex' justifyContent='flex-end'>
          * is required
        </Typography>
        <Box display='flex' justifyContent='center'>
          <Button type='submit' variant='contained' color='primary' sx={{ width: '150px' }}>
            Add Task
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddTask;
