import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskServicesService } from 'src/app/@services/task-services.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: any = [];
  newTask: string = '';
  newTitle: string = '';

  constructor(
    private taskServ: TaskServicesService,
    private router: Router,
  ) { }

  async ngOnInit() {
    const tareas: any = await this.taskServ.getTareas();


    tareas.tareas.forEach((t: any) => {
      t.edit = false;
    });

    this.tasks = tareas.status ? tareas.tareas : [];
  }


  addTask() {
    if (this.newTask.trim()) {
      const dataSend = {
        titulo: this.newTitle,
        descripcion: this.newTask
      };

      this.taskServ.postTarea(dataSend).then((res: any) => {
        if (res.status) {
          this.tasks.push({ titulo: this.newTitle, descripcion: this.newTask, estado: false });
          this.newTask = '';
          this.newTitle = '';
          alert('Tarea agregada existosamente');
        } else {
          alert('Hubo un error al registar la tarea, intente de nuevo');
        }
      })
    }
  }

  async completeTask(task: any) {
    const data = { estado: !task.estado };
    console.log('data :>> ', data);
    await this.taskServ.completeTarea(task.id, data).then((res: any) => {
      console.log('res :>> ', res);
      if (res.status) {
        task.edit = false;
        const txt = task.estado ? ' completada' : ' no completada';
        alert('Tarea ' + task.descripcion + txt);
      }
    })
  }

  removeTask(task: any, idx: number) {
    const result = window.confirm('Desea remover esta tarea?');

    if (result) {
      this.taskServ.getSendHistorial(task.id).then((res: any) => {
        console.log('res :>> ', res);

        if (res.status) {
          this.tasks.splice(idx, 1);
          alert('Tarea ' + task.descripcion + ' removida');
        } else {
          alert('Hubo un error al remover la tarea, intente de nuevo');
        }
      });
    }
  }

  editTask(idx: number) {
    this.tasks[idx].edit = true;
  }

  viewTrash() {
    this.router.navigateByUrl('/trash');
  }

  saveEdit(task: any, idx: number) {
    const dataSend = {
      titulo: task.titulo,
      descripcion: task.descripcion
    };

    this.taskServ.putTarea(dataSend, task.id).then((res: any) => {
      console.log('res :>> ', res);

      if (res.status) {
        this.tasks[idx].edit = false;
        this.tasks[idx].titulo = task.titulo;
        this.tasks[idx].descripcion = task.descripcion;
      }
    })
  }
}
