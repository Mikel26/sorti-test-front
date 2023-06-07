import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskTrashComponent } from './components/task-trash/task-trash.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'trash', component: TaskTrashComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
