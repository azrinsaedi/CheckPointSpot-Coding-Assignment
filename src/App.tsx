import React, { useState, useMemo, useCallback } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Task from './components/Task';
import Footer from './components/Footer';
import { Task as TaskType } from './types';
import { nanoid } from 'nanoid';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>('');
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('darkMode') || 'false');
  });

  const handleToggle = useCallback((id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: task.status === 'DONE' ? 'IN PROGRESS' : 'DONE' } : task
      )
    );
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  const handleAddTask = useCallback(() => {
    if (newTaskName.trim() === '' || newTaskDescription.trim() === '') return;

    const newTaskObj: TaskType = {
      id: nanoid(8),
      name: newTaskName,
      description: newTaskDescription,
      status: 'IN PROGRESS',
    };

    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setNewTaskName('');
    setNewTaskDescription('');
  }, [newTaskName, newTaskDescription]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Task
        tasks={tasks}
        newTaskName={newTaskName}
        newTaskDescription={newTaskDescription}
        setNewTaskName={setNewTaskName}
        setNewTaskDescription={setNewTaskDescription}
        handleAddTask={handleAddTask}
        handleToggle={handleToggle}
      />
      <Footer taskCount={tasks.length} />
    </ThemeProvider>
  );
};

export default App;
