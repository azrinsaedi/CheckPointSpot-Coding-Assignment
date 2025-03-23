export enum TaskStatus {
  IN_PROGRESS = 'IN PROGRESS',
  DONE = 'DONE',
  COMPLETED = 'COMPLETED',
}

export type Task = {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  parentId: string;
};

export type TaskListProps = {
  tasks: Task[];
  handleToggle: (id: string) => void;
};

export type TaskProps = {
  tasks: Task[];
  newTaskName: string;
  newTaskDescription: string;
  setNewTaskName: (name: string) => void;
  setNewTaskDescription: (description: string) => void;
  handleAddTask: () => void;
  handleToggle: (id: string) => void;
};

export interface TaskContextProps {
  tasks: Task[];
  filteredTasks: Task[];
  filter: string;
  setFilter: (filter: string) => void;
  handleToggle: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
}
