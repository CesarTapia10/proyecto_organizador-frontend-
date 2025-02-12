import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtRequest } from '../models/JwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs';


const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url2 = `${base_url}/usuarios`;
  private url = `${base_url}/login`;

  constructor(private http: HttpClient) {}
  login(request: JwtRequest) {

    return this.http.post(this.url, request);
    //https://ego-task-backend.onrender.com
   //  return this.http.post('http://localhost:8081/login', request);
  }
  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }
  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }

  showName(){
    let token = sessionStorage.getItem('token');
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken);
    return decodedToken?.sub;
  }
  userlogin(nombre: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url2}/nombreusuario?nombreuser=${nombre}`);
  }
  
}
