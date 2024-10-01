import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllTasks } from '../../states/task.selectors';
import { completeTask, removeTask } from '../../states/task.actions';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<any>;
  displayTaskForm: boolean = false;
  selectedTask: any = null;
  @ViewChild('taskFormComponent') taskFormComponent!: TaskFormComponent;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.tasks$ = this.store.select(selectAllTasks); // Para obtener todas las tareas desde el NgStore
    console.log(selectAllTasks);
  }

  onCompleteTask(taskId: number): void {
    this.store.dispatch(completeTask({ taskId })); // Cambiar estado a completada
  }

  onRemoveTask(taskId: number): void {
    this.store.dispatch(removeTask({ taskId })); // Eliminar tarea
  }
  showTaskForm(task?: any): void {
    console.log(task);
    if (task) {
      this.selectedTask ={...task} || null; // Si es una tarea seleccionada, cargarla; si no, es una nueva tarea
      this.displayTaskForm = true; // Muestra el diálogo para editar
    } else {
      this.displayTaskForm = true; // Muestra el diálogo para agregar
      this.selectedTask = null;
    }
  }
  onDialogHide(): void {
    console.log("Dialog closed");

    // Verifica que taskFormComponent está definido antes de llamar al método
    if (this.taskFormComponent) {
      this.taskFormComponent.resetForm();
    }
  }
}
