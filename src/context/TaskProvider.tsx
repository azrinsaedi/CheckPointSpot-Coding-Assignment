import React, { useState } from 'react';
import { Task, TaskStatus } from '../types';
import { TaskContext } from './TaskContext';

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('ALL');
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const filteredTasks = tasks.filter((task) => filter === 'ALL' || task.status === (filter as TaskStatus));

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        filter,
        setFilter,
        filteredTasks,
        newTaskName,
        setNewTaskName,
        newTaskDescription,
        setNewTaskDescription,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
