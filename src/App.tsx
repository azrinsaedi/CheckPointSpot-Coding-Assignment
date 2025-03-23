import React, { useMemo, useCallback } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Task from './components/Task';
import Footer from './components/Footer';
import { nanoid } from 'nanoid';
import { useTaskContext } from './context/useTaskContext';
import { TaskStatus } from './types';

const App: React.FC = () => {
  const { setTasks } = useTaskContext();

  const [darkMode, setDarkMode] = React.useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('darkMode') || 'false');
  });

  const handleToggle = useCallback(
    (id: string) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                status: task.status === TaskStatus.DONE ? TaskStatus.IN_PROGRESS : TaskStatus.DONE,
              }
            : task
        )
      );
    },
    [setTasks]
  );

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  const handleAddTask = useCallback(
    (newTaskName: string, newTaskDescription: string) => {
      if (newTaskName.trim() === '' || newTaskDescription.trim() === '') return;

      const newTaskObj = {
        id: nanoid(8),
        name: newTaskName,
        description: newTaskDescription,
        status: TaskStatus.IN_PROGRESS,
      };

      setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    },
    [setTasks]
  );

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
      <Task handleAddTask={handleAddTask} handleToggle={handleToggle} />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
