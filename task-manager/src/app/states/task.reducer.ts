import { createReducer, on } from '@ngrx/store';
import { addTask, removeTask, completeTask, updateTask } from './task.actions';

export interface TaskState {
  tasks: any[];
}

export const initialState: TaskState = {
  tasks: [],
};

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, { ...task, id: state.tasks.length + 1, completed: false }],
  })),
  on(removeTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== taskId),
  })),
  on(completeTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    ),
  })),
  on(updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === task.id ? { ...task } : t)),
  }))
);
