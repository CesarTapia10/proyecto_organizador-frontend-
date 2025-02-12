import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { comentarios } from '../models/comentarios';
import { HttpClient } from '@angular/common/http';
import { CantidadDeComentariosPorUsuarioDTO } from '../models/CantidadDeComentariosPorUsuarioDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private url = `${base_url}/comentarios`;
  private listaCambio = new Subject<comentarios[]>();

  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<comentarios[]>(this.url);
  }
  insert(c: comentarios) {
    return this.http.post(this.url, c);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: comentarios[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    //Se pasa por medio de un Path variable el id o el campo necesario para eliminar.
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number){
    return this.http.get<comentarios>(`${this.url}/${id}`);
   // return this.http.get<Usuarios>(`${this.url}/${id}`);
  }
  update(com: comentarios){
    return this.http.put(this.url,com);
  }

  getcantidaddecomentariosporusuario(): Observable<CantidadDeComentariosPorUsuarioDTO[]> {
    return this.http.get<CantidadDeComentariosPorUsuarioDTO[]>(`${this.url}/CantidadDeComentarios`);
  }
  
}
