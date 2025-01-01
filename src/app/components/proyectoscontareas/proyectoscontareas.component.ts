import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarproyectosComponent } from '../proyectos/listarproyectos/listarproyectos.component';

@Component({
  selector: 'app-proyectoscontareas',
  imports: [RouterOutlet, ListarproyectosComponent],
  templateUrl: './proyectoscontareas.component.html',
  styleUrl: './proyectoscontareas.component.css'
})
export class ProyectoscontareasComponent {
  constructor(public route:ActivatedRoute) {}
}
