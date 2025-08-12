import { useState, useMemo } from 'react';
import { Task } from '../types/Task';

export type FilterType = 'all' | 'completed' | 'incomplete';

export const useTaskFilter = (tasks: Task[]) => {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'incomplete':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    incomplete: tasks.filter(task => !task.completed).length,
  }), [tasks]);

  return {
    filter,
    setFilter,
    filteredTasks,
    taskCounts,
  };
};
