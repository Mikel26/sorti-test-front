import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskServicesService } from 'src/app/@services/task-services.service';

@Component({
  selector: 'app-task-trash',
  templateUrl: './task-trash.component.html',
  styleUrls: ['./task-trash.component.scss']
})
export class TaskTrashComponent implements OnInit {
  tasks: any = [];

  constructor(
    private taskServ: TaskServicesService,
    private router: Router,
  ) { }

  async ngOnInit() {
    const historial: any = await this.taskServ.getHistorialTareas();

    this.tasks = historial.status ? historial.tareas : [];
  }

  recoverTask(task: any, idx: number) {
    const result = window.confirm('Desea restaurar esta tarea?');

    if (result) {
      this.taskServ.getRecoverTarea(task.id).then((resp: any) => {
        console.log('resp :>> ', resp);

        if (resp.status) {
          this.tasks.splice(idx, 1);
          alert('Tarea restaurada con éxito');
        } else {
          alert('Hubo un error al restaurar la tarea, intente de nuevo');
        }
      })
    }
  }

  deleteTask(task: any, idx: any) {
    const result = window.confirm('Desea eliminar permanentemente esta tarea?');

    if (result) {
      this.taskServ.deleteTarea(task.id).then((res: any) => {
        console.log('res :>> ', res);

        if (res.status) {
          this.tasks.splice(idx, 1);
          alert('Tarea ' + task.descripcion + ' eliminada');
        } else {
          alert('Hubo un error al eliminiar la tarea, intente de nuevo');
        }
      });
    }
  }

  back() {
    this.router.navigateByUrl('/')
  }

}
