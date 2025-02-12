import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProyectosconTareas } from '../models/ProyectosconTareas';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CantidaDeUsuarioConTareasyProyectosDTO } from '../models/CantidaDeUsuarioConTareasyProyectosDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ProyectosconTareasService {
  private url =  `${base_url}/proyectoscontareas`;
  private listaCambio = new Subject<ProyectosconTareas[]>();

  
  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<ProyectosconTareas[]>(this.url);
  }
  insert(p: ProyectosconTareas) {
    return this.http.post(this.url, p);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: ProyectosconTareas[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<ProyectosconTareas>(`${this.url}/${id}`);
  }

  update(pro: ProyectosconTareas) {
    return this.http.put(this.url, pro);
  }

  getusuarioscontareasyproyectos(): Observable<CantidaDeUsuarioConTareasyProyectosDTO[]> {
    return this.http.get<CantidaDeUsuarioConTareasyProyectosDTO[]>(`${this.url}/CantidadDeUusarioConTareasYPoryectos`);
  }
  
}
