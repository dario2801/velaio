import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { taskReducer } from './states/task.reducer';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { ChipsModule } from 'primeng/chips';
@NgModule({
  declarations: [AppComponent, TaskListComponent, TaskFormComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    CardModule,
    ButtonModule,
    ToastModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ tasks: taskReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([]),
    DialogModule,
    ChipsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
