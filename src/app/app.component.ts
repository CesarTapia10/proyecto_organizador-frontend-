import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login.service';
import { TareasComponent } from './components/tareas/tareas.component';
import { RolesComponent } from './components/roles/roles.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ProyectoscontareasComponent } from './components/proyectoscontareas/proyectoscontareas.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { ColaboradoresComponent } from './components/colaboradores/colaboradores.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    RouterLink,
    RouterModule,
    CommonModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto_organizador';
  role: string = '';
  constructor(private loginService: LoginService) {}
  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  esAdministrador() {
    return this.role === 'ADMINISTRADOR';
  }

  esUsuario(){
    return this.role === 'USUARIO';
  }
}
