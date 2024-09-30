import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { addTask, updateTask } from 'src/app/states/task.actions';
import { selectAllTasks } from 'src/app/states/task.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  providers: [MessageService],
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  @Input() task: any; //Para recibir la tarea seleccionada a editar
  isEditMode: boolean = false;
  allTasks$: Observable<any[]> = this.store.select(selectAllTasks); // Obtener todas las tareas de la Store

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      dueDate: ['', [Validators.required, this.futureDateValidator]], // Validación personalizada para la fecha
      people: this.fb.array([]),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      console.log(this.task);
      this.isEditMode = !!this.task?.id; // Verificamos si la tarea tiene un ID para saber si es edición
      this.loadTaskData();
    }
  }
  // Obtener el FormArray de personas
  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  // Agregar persona al FormArray
  addPerson(): void {
    this.people.push(
      this.fb.group({
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            this.noNumbersOrSpecialCharsValidator,
          ],
        ],
        age: ['', [Validators.required, Validators.min(18)]],
        skills: this.fb.control([], Validators.required),
      })
    );
  }

  // Remover persona del FormArray
  removePerson(index: number): void {
    this.people.removeAt(index);
  }

  // Validar si la fecha es mayor o igual a la actual
  futureDateValidator(control: AbstractControl) {
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignorar la hora para comparar solo la fecha
    return inputDate >= today ? null : { invalidDate: true };
  }

  // Validar si el nombre tiene caracteres especiales o números
  noNumbersOrSpecialCharsValidator(control: AbstractControl) {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(control.value) ? null : { invalidName: true };
  }

  // Cargar datos de la tarea
  loadTaskData(): void {
    // Limpiar el formulario antes de cargar la tarea
    this.people.clear();
    console.log('task', this.task.actionsObserver.value.task);
    const values = this.task.actionsObserver.value.task;
    if (this.task) {
      // Establece los valores de la tarea en el formulario si existen
      this.taskForm.patchValue({
        name: values.name,
        dueDate: values.dueDate,
      });

      // Verificar si en people existe y tiene datos
      if (values.people && Array.isArray(values.people)) {
        values.people.forEach((person: any) => {
          const personGroup = this.fb.group({
            name: [person.name, [Validators.required, Validators.minLength(5)]],
            age: [person.age, [Validators.required, Validators.min(18)]],
            skills: [person.skills || [], Validators.required],
          });
          this.people.push(personGroup);
        });
      }
    }
  }
  // Generrar un id unico para cada tarea
  generateUniqueId(): number {
    return Math.floor(Math.random() * 100000); // Genera un ID único
  }
  
  // Enviar el formulario
  onSubmit(): void {
    if (
      this.taskForm.valid &&
      this.taskForm.value.people.length > 0 &&
      this.people.valid
    ) {
      const taskData = { ...this.taskForm.value };

      if (this.isEditMode) {
        // Actualizar tarea
        const updatedTask = { ...this.task, ...taskData }; // Mantener el ID de la tarea original
        this.store.dispatch(updateTask({ task: updatedTask })); // Acción para actualizar
        this.messageService.add({
          severity: 'success',
          summary: 'Task Updated',
          detail: 'Your task has been successfully updated!',
        });
      } else {
        this.store.dispatch(addTask({ task: {...taskData,id:this.generateUniqueId()} })); // Acción para crear
        this.messageService.add({
          severity: 'success',
          summary: 'Task Created',
          detail: 'Your task has been successfully created!',
        });
      }
      this.taskForm.reset();
    } else {
      this.taskForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'Please fill out all required fields and add at least one person.',
      });

      Object.values(this.taskForm.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((c) => c.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
  }
}
