import { createAction, props } from '@ngrx/store';

export const addTask = createAction('[Task] Add Task', props<{ task: any }>());

export const removeTask = createAction(
  '[Task] Remove Task',
  props<{ taskId: number }>()
);

export const completeTask = createAction(
  '[Task] Complete Task',
  props<{ taskId: number }>()
);
export const updateTask = createAction(
  '[Task] Update Task',
  props<{ task: any }>()
);
