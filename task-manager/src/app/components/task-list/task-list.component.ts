import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllTasks } from '../../states/task.selectors';
import { completeTask, removeTask } from '../../states/task.actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<any>;
  displayTaskForm: boolean = false;
  selectedTask: any = null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.tasks$ = this.store.select(selectAllTasks); // Para obtener todas las tareas desde el NgStore
  }

  onCompleteTask(taskId: number): void {
    this.store.dispatch(completeTask({ taskId })); // Cambiar estado a completada
  }

  onRemoveTask(taskId: number): void {
    this.store.dispatch(removeTask({ taskId })); // Eliminar tarea
  }
  showTaskForm(task?: any): void {
    console.log(task);
    this.selectedTask = task || null; // Si es una tarea seleccionada, cargarla; si no, es una nueva tarea
    this.displayTaskForm = true; // Muestra el diálogo
  }
}
