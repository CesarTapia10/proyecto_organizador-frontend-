import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Colaboradores } from '../models/Colaboradores';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


const base_url = environment.base;



@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {


  private url = `${base_url}/colaboradores`;
  private listaCambio = new Subject<Colaboradores[]>();

  constructor(private http: HttpClient) { }

  
  list() {
    return this.http.get<Colaboradores[]>(this.url);
  }
  insert(c: Colaboradores) {
    return this.http.post(this.url, c);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Colaboradores[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    //Se pasa por medio de un Path variable el id o el campo necesario para eliminar.
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number){
    return this.http.get<Colaboradores>(`${this.url}/${id}`);
  }
  update(co: Colaboradores){
    return this.http.put(this.url,co);
  }
}
