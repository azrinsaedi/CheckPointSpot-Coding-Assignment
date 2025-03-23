import { createContext } from 'react';
import { TaskType } from '../types';

interface TaskContextType {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filteredTasks: TaskType[];
  newTaskName: string;
  setNewTaskName: React.Dispatch<React.SetStateAction<string>>;
  newTaskDescription: string;
  setNewTaskDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);
