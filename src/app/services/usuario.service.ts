import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
import { Usuario } from '../models/Usuario';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = `${base_url}/usuarios`;
  private  listaCambio = new Subject<Usuario[]>();
  private url2= `${base_url}/usuarios/signUp`;

  constructor(private http: HttpClient, ) { }
  list(){
    return this.http.get<Usuario[]>(this.url);
  }
  insert(u: Usuario){
    return this.http.post(this.url,u);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva : Usuario[]){
    this.listaCambio.next(listaNueva);
  }
  listId(id: number){
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  delete(id:  number){  
    return this.http.delete(`${this.url}/${id}`);
  }

  update(us : Usuario){
    return this.http.put(this.url,us);
  }

  listNoAuth(email : string){
    return this.http.get<Usuario>(`${this.url}/NoAuth${email}`);
  }

  
}
