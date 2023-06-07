import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskServicesService {
  url = 'http://127.0.0.1:3333'

  constructor(private http: HttpClient) { }

  async postTarea(data: any) {
    return await new Promise((resolve, reject) => {
      this.http.post(this.url + '/tareas/postTarea', data).subscribe({
        next: (resp) => resolve(resp),
        error: (e) => reject(e)
      })
    });
  }

  async putTarea(data: any, id: any) {
    return await new Promise((resolve, reject) => {
      this.http.put(this.url + '/tareas/updateTarea/' + id, data).subscribe({
        next: (resp) => resolve(resp),
        error: (e) => reject(e)
      })
    });
  }

  async completeTarea(id: any, data: any) {
    return await new Promise((resolve, reject) => {
      this.http.put(this.url + '/tareas/completeTarea/' + id, data).subscribe({
        next: (resp) => resolve(resp),
        error: (e) => reject(e)
      })
    });
  }

  async deleteTarea(id: any) {
    return await new Promise((resolve, reject) => {
      this.http.delete(this.url + '/tareas/deleteTarea/' + id).subscribe({
        next: (resp) => resolve(resp),
        error: (e) => reject(e)
      })
    });
  }

  async getTareas() {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/tareas/getTareas').subscribe({
        next: (v) => resolve(v),
        error: (e) => reject(e),
        // complete: () => console.info('complete')
      });
    });
  }

  async getHistorialTareas() {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/tareas/getHistorial').subscribe({
        next: (v) => resolve(v),
        error: (e) => reject(e),
        // complete: () => console.info('complete')
      });
    });
  }

  async getSendHistorial(id: any) {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/tareas/sendHistorial/' + id).subscribe({
        next: (v) => resolve(v),
        error: (e) => reject(e),
        // complete: () => console.info('complete')
      });
    });
  }

  async getRecoverTarea(id: any) {
    return await new Promise((resolve, reject) => {
      this.http.get(this.url + '/tareas/recoverTarea/' + id).subscribe({
        next: (v) => resolve(v),
        error: (e) => reject(e),
        // complete: () => console.info('complete')
      });
    });
  }
}
