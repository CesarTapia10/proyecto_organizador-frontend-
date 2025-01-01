import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Tareas } from '../models/Tareas';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private url =  `${base_url}/tareas`;
  private listaCambio = new Subject<Tareas[]>();

  
  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<Tareas[]>(this.url);
  }
  insert(t: Tareas) {
    return this.http.post(this.url, t);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Tareas[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Tareas>(`${this.url}/${id}`);
  }

  update(ta: Tareas) {
    return this.http.put(this.url, ta);
  }
}
