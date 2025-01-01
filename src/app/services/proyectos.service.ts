import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Proyectos } from '../models/Proyectos';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private url =  `${base_url}/proyectos`;
  private listaCambio = new Subject<Proyectos[]>();

  
  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<Proyectos[]>(this.url);
  }
  insert(p: Proyectos) {
    return this.http.post(this.url, p);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Proyectos[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Proyectos>(`${this.url}/${id}`);
  }

  update(pro: Proyectos) {
    return this.http.put(this.url, pro);
  }
}
