import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreareditarusuariosComponent } from './components/usuario/creareditarusuarios/creareditarusuarios.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { LoginComponent } from './components/login/login.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { TareasComponent } from './components/tareas/tareas.component';
import { CreareditarTareasComponent } from './components/tareas/creareditar-tareas/creareditar-tareas.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { CreareditarproyectosComponent } from './components/proyectos/creareditarproyectos/creareditarproyectos.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { CreareditarcomentariosComponent } from './components/comentarios/creareditarcomentarios/creareditarcomentarios.component';
import { ColaboradoresComponent } from './components/colaboradores/colaboradores.component';
import { CreareditarcolaboradoresComponent } from './components/colaboradores/creareditarcolaboradores/creareditarcolaboradores.component';
import { HomeComponent } from './components/home/home.component';
import { ProyectoscontareasComponent } from './components/proyectoscontareas/proyectoscontareas.component';
import { CreareditarproyectosContareasComponent } from './components/proyectoscontareas/creareditarproyectos-contareas/creareditarproyectos-contareas.component';
import { RolesComponent } from './components/roles/roles.component';
import { CreareditarrolesComponent } from './components/roles/creareditarroles/creareditarroles.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReportestareasconproyectosComponent } from './components/reportes/reportestareasconproyectos/reportestareasconproyectos.component';
import { ReportescomentarioComponent } from './components/reportes/reportescomentario/reportescomentario.component';
import { ReportestareasComponent } from './components/reportes/reportestareas/reportestareas.component';




export const routes: Routes = [
  
     {
        path: '',
        component: LandingPageComponent,
      },
      {
        path: 'contacto',
        component: ContactoComponent,
      },
      {
        path: 'signUp',
        component: SingUpComponent,
      }, 
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'usuarios',
        component: UsuarioComponent,
        children: [
          {
            path: 'nuevo',
            component: CreareditarusuariosComponent,
          },
          {
            path: 'edicionUsuario/:id',
            component: CreareditarusuariosComponent,
          },
        ],
        canActivate: [seguridadGuard],
      },
      {
        path: 'tareas',
        component: TareasComponent,
        children: [
          {
            path: 'nuevo',
            component: CreareditarTareasComponent,
          },
          {
            path: 'ediciones/:id',
            component: CreareditarTareasComponent,
          },
        ],
        canActivate: [seguridadGuard],
      },
      {
        path: 'reportes',
        component: ReportesComponent,
        children: [
          {
            path: 'ReportesDeTareas',
            component: ReportestareasComponent,
          },
          {
            path: 'ReportesDeComentarios',
            component: ReportescomentarioComponent,
          },
          {
            path: 'ReportesDeTareasConProyectos',
            component: ReportestareasconproyectosComponent,
          },
        ],
        canActivate: [seguridadGuard],
      },
      {
        path: 'proyectos',
        component: ProyectosComponent,
        children: [
          {
            path: 'nuevo',
            component: CreareditarproyectosComponent,
          },
          {
            path: 'ediciones/:id',
            component: CreareditarproyectosComponent,
          },
        ],
        canActivate: [seguridadGuard],
      },

      {
        path: 'proyectoscontareas',
        component: ProyectoscontareasComponent,
        children: [
          {
            path: 'nuevo',
            component: CreareditarproyectosContareasComponent,
          },
          {
            path: 'ediciones/:id',
            component: CreareditarproyectosContareasComponent,
          },
        ],
        canActivate: [seguridadGuard],
      },
      {
        path: 'comentarios',
        component: ComentariosComponent,
        children: [
          {
            path: 'nuevo',
            component: CreareditarcomentariosComponent,
          },
          {
            path: 'ediciones/:id',
            component: CreareditarcomentariosComponent,
          },
        ],
        canActivate: [seguridadGuard],
      },
      {
        path: 'colaboradores',
        component: ColaboradoresComponent,
        children: [
          {
            path: 'nuevo',
            component: CreareditarcolaboradoresComponent,
          },
          {
            path: 'ediciones/:id',
            component: CreareditarcolaboradoresComponent,
          },
        ],
        canActivate: [seguridadGuard],
      },
      {
        path: 'roles',
        component: RolesComponent,
        children: [
          {
            path: 'nuevo',
            component: CreareditarrolesComponent,
          },
          {
            path: 'edicionesRoles/:id',
            component: CreareditarrolesComponent,
          },
        ],
        canActivate: [seguridadGuard],
      },
      {
        path: 'homes',
        component: HomeComponent,
        canActivate: [seguridadGuard], // solo construcciones, se debe agregar a cada uno
      },


];
