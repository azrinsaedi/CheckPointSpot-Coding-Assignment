import React from 'react';
import { Box, Checkbox, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { TaskListProps, TaskType } from '../types';

const TaskList: React.FC<TaskListProps> = ({ tasks, handleToggle }) => {
  const taskMap: { [key: string]: TaskType[] } = tasks.reduce((acc, task) => {
    if (task.parentId) {
      if (!acc[task.parentId]) {
        acc[task.parentId] = [];
      }
      acc[task.parentId].push(task);
    }
    return acc;
  }, {} as { [key: string]: TaskType[] });

  return (
    <Box sx={{ overflowX: 'auto', width: '100%' }}>
      <List
        component={Box}
        sx={{
          display: 'grid',
          gridTemplateColumns: '50px 100px 100px 150px 150px 100px 100px 140px 140px 100px',
          gap: 1,
        }}
      >
        <ListItem sx={{ fontWeight: 'bold', display: 'contents', backgroundColor: 'lightgray' }}>
          <ListItemText primary='Tick' sx={{ textAlign: 'center' }} />
          <ListItemText primary='ID' sx={{ textAlign: 'center' }} />
          <ListItemText primary='Name' sx={{ textAlign: 'center' }} />
          <ListItemText primary='Description' sx={{ textAlign: 'center' }} />
          <ListItemText primary='Status' sx={{ textAlign: 'center' }} />
          <ListItemText primary='Parent ID' sx={{ textAlign: 'center' }} />
          <ListItemText primary='# of Dependencies' sx={{ textAlign: 'center' }} />
          <ListItemText primary='# of DONE Dependencies' sx={{ textAlign: 'center' }} />
          <ListItemText primary='# of COMPLETE Dependencies' sx={{ textAlign: 'center' }} />
          <ListItemText primary='Child tasks' sx={{ textAlign: 'center' }} />
        </ListItem>

        {tasks.map((task) => (
          <ListItem key={task.id} sx={{ display: 'contents' }}>
            <ListItemIcon
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '30px',
              }}
            >
              <Checkbox
                checked={task.status === 'DONE' || task.status === 'COMPLETE'}
                onChange={() => handleToggle(task.id)}
              />
            </ListItemIcon>
            <ListItemText primary={task.id} sx={{ textAlign: 'center' }} />
            <ListItemText primary={task.name} sx={{ textAlign: 'center' }} />
            <ListItemText primary={task.description} sx={{ textAlign: 'center' }} />
            <ListItemText
              sx={{ textAlign: 'center' }}
              primary={
                <Chip
                  label={task.status}
                  sx={{
                    textAlign: 'center',
                    bgcolor:
                      task.status === 'IN PROGRESS'
                        ? 'orange'
                        : task.status === 'DONE'
                        ? 'green'
                        : task.status === 'COMPLETE'
                        ? 'blue'
                        : 'gray',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
              }
            />
            <ListItemText primary={task.parentId} sx={{ textAlign: 'center' }} />
            <ListItemText primary={task.noOfDependencies} sx={{ textAlign: 'center' }} />
            <ListItemText primary={task.noOfDoneDependencies} sx={{ textAlign: 'center' }} />
            <ListItemText primary={task.noOfCompleteDependencies} sx={{ textAlign: 'center' }} />

            {taskMap[task.id] && taskMap[task.id].length > 0 ? (
              <Box sx={{ padding: 0 }}>
                <List sx={{ padding: 0 }}>
                  {taskMap[task.id].map((dependentTask) => (
                    <ListItem key={dependentTask.id} sx={{ padding: 0 }}>
                      <ListItemText primary={dependentTask.name} sx={{ textAlign: 'center' }} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ) : (
              <Box sx={{ paddingLeft: 3 }}>
                <ListItem sx={{ display: 'contents' }}>
                  <ListItemText primary='' sx={{ textAlign: 'center' }} />
                </ListItem>
              </Box>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
