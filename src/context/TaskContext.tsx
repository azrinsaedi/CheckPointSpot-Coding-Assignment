import { createContext } from 'react';
import { Task } from '../types';

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filteredTasks: Task[];
  newTaskName: string;
  setNewTaskName: React.Dispatch<React.SetStateAction<string>>;
  newTaskDescription: string;
  setNewTaskDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);
