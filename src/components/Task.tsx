import React from 'react';
import { Container, Box, Paper, Typography, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import TaskList from './TaskList';
import { useTaskContext } from '../context/useTaskContext';
import { TaskType } from '../types';
import AddTask from './AddTask';

const Task: React.FC<{
  handleAddTask: (newTaskName: string, newTaskDescription?: string, parentTaskId?: string) => TaskType | null;
  handleToggle: (id: string) => void;
}> = ({ handleAddTask, handleToggle }) => {
  const {
    filteredTasks,
    filter,
    setFilter,
    tasks,
    setTasks,
    newTaskName,
    setNewTaskName,
    newTaskDescription,
    setNewTaskDescription,
  } = useTaskContext();

  const [parentTaskId, setParentTaskId] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTaskName.trim()) {
      setError(true);
      return;
    }

    const newTask = handleAddTask(newTaskName, newTaskDescription?.trim() || '', parentTaskId.trim() || '');

    if (!newTask) return;

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];

      const updatedTasksWithDependencies = updatedTasks.map((task) => {
        const noOfDependencies = updatedTasks.filter((t) => t.parentId === task.id).length;
        const noOfDoneDependencies = updatedTasks.filter((t) => t.parentId === task.id && t.status === 'DONE').length;
        const noOfCompleteDependencies = updatedTasks.filter(
          (t) => t.parentId === task.id && t.status === 'COMPLETE'
        ).length;
        return {
          ...task,
          noOfDependencies,
          noOfDoneDependencies,
          noOfCompleteDependencies,
        };
      });

      return updatedTasksWithDependencies;
    });

    setNewTaskName('');
    setNewTaskDescription('');
    setParentTaskId('');
    setError(false);
  };

  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <AddTask
          newTaskName={newTaskName}
          setNewTaskName={setNewTaskName}
          newTaskDescription={newTaskDescription}
          setNewTaskDescription={setNewTaskDescription}
          parentTaskId={parentTaskId}
          setParentTaskId={setParentTaskId}
          handleSubmit={handleSubmit}
          error={error}
          setError={setError}
        />

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
              <MenuItem value='COMPLETE'>Complete</MenuItem>
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
