import { TaskType } from '../types';

export const hasCircularDependency = (taskId: string, parentId: string, tasks: TaskType[]): boolean => {
  let currentParentId = parentId;

  while (currentParentId) {
    const parentTask = tasks.find((task) => task.id === currentParentId);
    if (!parentTask) return false;

    if (parentTask.parentId === taskId) {
      return true;
    }

    currentParentId = parentTask.parentId;
  }

  return false;
};
