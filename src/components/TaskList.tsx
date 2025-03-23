import React from 'react';
import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { TaskListProps } from '../types';

const TaskList: React.FC<TaskListProps> = ({ tasks, handleToggle }) => {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} divider>
          <ListItemButton>
            <ListItemIcon>
              <Checkbox checked={task.status === 'DONE'} onChange={() => handleToggle(task.id)} />
            </ListItemIcon>
            <ListItemText primary={`ID: ${task.id}`} />
            <ListItemText primary={`Name: ${task.name}`} />
            <ListItemText primary={`Description: ${task.description}`} />
            <ListItemText primary={`Status: ${task.status}`} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
