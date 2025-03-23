export enum TaskStatus {
  IN_PROGRESS = 'IN PROGRESS',
  DONE = 'DONE',
  COMPLETE = 'COMPLETE',
}

export type TaskType = {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  parentId: string;
  noOfDependencies: number;
  noOfDoneDependencies: number;
  noOfCompleteDependencies: number;
};

export type TaskListProps = {
  tasks: TaskType[];
  handleToggle: (id: string) => void;
};

export type TaskProps = {
  tasks: TaskType[];
  newTaskName: string;
  newTaskDescription: string;
  setNewTaskName: (name: string) => void;
  setNewTaskDescription: (description: string) => void;
  handleAddTask: (newTaskName: string, newTaskDescription: string, parentTaskId: string) => TaskType | null;
  handleToggle: (id: string) => void;
};

export interface TaskContextProps {
  tasks: TaskType[];
  filteredTasks: TaskType[];
  filter: string;
  setFilter: (filter: string) => void;
  handleToggle: (id: string) => void;
  setTasks: (tasks: TaskType[]) => void;
}

export interface AddTaskProps {
  newTaskName: string;
  setNewTaskName: (name: string) => void;
  newTaskDescription: string;
  setNewTaskDescription: (description: string) => void;
  parentTaskId: string;
  setParentTaskId: (parentId: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error: boolean;
  setError: (error: boolean) => void;
}
