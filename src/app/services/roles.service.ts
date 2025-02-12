import { Injectable } from '@angular/core';
import { roles } from '../models/roles';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';


const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url =  `${base_url}/roles`;
  private  listaCambio = new Subject<roles[]>();
constructor(private http: HttpClient) { }
//hacer perición con el http client
  list(){
    return this.http.get<roles[]>(this.url);
  }
  insert(r: roles): Observable<any> {
    return this.http.post(this.url, r);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva : roles[]){
    this.listaCambio.next(listaNueva);
  }
  listId(id: number){
    return this.http.get<roles>(`${this.url}/${id}`);
  }

  delete(id:  number){  
    return this.http.delete(`${this.url}/${id}`);
  }

  update(r : roles){
    return this.http.put(this.url,r);
  }
}
