export type Task = {
  id: string;
  name: string;
  description: string;
  status: 'DONE' | 'IN PROGRESS';
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

export type FooterProps = {
  taskCount: number;
};
