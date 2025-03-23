import React, { useMemo, useCallback } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Task from './components/Task';
import Footer from './components/Footer';
import { nanoid } from 'nanoid';
import { useTaskContext } from './context/useTaskContext';
import { TaskType, TaskStatus } from './types';
import { hasCircularDependency } from './utils/checkCircularDependency';

const App: React.FC = () => {
  const { tasks, setTasks } = useTaskContext();

  const [darkMode, setDarkMode] = React.useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('darkMode') || 'false');
  });

  const handleToggle = useCallback(
    (id: string) => {
      setTasks((prevTasks) => {
        let updatedTasks = prevTasks.map((task) => {
          if (task.id === id && task.status === 'IN PROGRESS' && task.noOfDependencies === 0) {
            return {
              ...task,
              status: TaskStatus.COMPLETE,
            };
          }

          if (task.id === id && task.status === 'COMPLETE' && task.noOfDependencies === 0) {
            return {
              ...task,
              status: TaskStatus.IN_PROGRESS,
            };
          }

          if (task.id === id && task.status === 'IN PROGRESS' && task.noOfDependencies > 0) {
            let dependentTasks = prevTasks.filter((t) => t.parentId === task.id && t.status === TaskStatus.COMPLETE);
            if (dependentTasks.length === task.noOfDependencies) {
              return {
                ...task,
                status: TaskStatus.COMPLETE,
              };
            }

            dependentTasks = prevTasks.filter((t) => t.parentId === task.id && t.status === TaskStatus.IN_PROGRESS);
            return {
              ...task,
              status: TaskStatus.IN_PROGRESS,
            };
          }

          if (task.id === id && task.status === 'COMPLETE' && task.noOfDependencies > 0) {
            const dependentTasks = prevTasks.filter(
              (t) => t.parentId === task.id && t.status === TaskStatus.IN_PROGRESS
            );

            if (dependentTasks.length > 0) {
              return {
                ...task,
                status: TaskStatus.DONE,
              };
            }

            return {
              ...task,
              status: TaskStatus.COMPLETE,
            };
          }

          if (task.id === id && task.status === 'DONE' && task.noOfDependencies > 0) {
            const dependentTasks = prevTasks.filter(
              (t) => t.parentId === task.id && t.status === TaskStatus.IN_PROGRESS
            );

            if (dependentTasks.length > 0) {
              return {
                ...task,
                status: TaskStatus.IN_PROGRESS,
              };
            }

            return {
              ...task,
              status: TaskStatus.COMPLETE,
            };
          }

          return task;
        });

        updatedTasks = updatedTasks.map((task) => {
          const noOfDependencies = updatedTasks.filter((t) => t.parentId === task.id).length;
          const noOfDoneDependencies = updatedTasks.filter(
            (t) => t.parentId === task.id && t.status === TaskStatus.DONE
          ).length;
          const noOfCompleteDependencies = updatedTasks.filter(
            (t) => t.parentId === task.id && t.status === TaskStatus.COMPLETE
          ).length;

          return {
            ...task,
            noOfDependencies,
            noOfDoneDependencies,
            noOfCompleteDependencies,
          };
        });

        updatedTasks = updatedTasks.map((e) => {
          if (e.noOfDependencies === e.noOfCompleteDependencies && e.noOfDependencies !== 0) {
            return {
              ...e,
              status: TaskStatus.COMPLETE,
            };
          }

          if (e.noOfDependencies !== e.noOfCompleteDependencies && e.noOfDependencies !== 0) {
            return {
              ...e,
              status: TaskStatus.DONE,
            };
          }
          return e;
        });

        return updatedTasks;
      });
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
    (newTaskName: string, newTaskDescription: string = '', parentTaskId: string = ''): TaskType | null => {
      if (newTaskName.trim() === '') return null;

      const newTaskObj = {
        id: nanoid(8),
        name: newTaskName,
        description: newTaskDescription || '',
        status: TaskStatus.IN_PROGRESS,
        parentId: parentTaskId || '',
        noOfDependencies: 0,
        noOfDoneDependencies: 0,
        noOfCompleteDependencies: 0,
      };

      if (hasCircularDependency(newTaskObj.id, parentTaskId, tasks)) {
        alert('Cannot create task due to circular dependency!');
        return null;
      }

      return newTaskObj;
    },
    [tasks]
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
