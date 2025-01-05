import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarproyectoscontareasComponent } from './listarproyectoscontareas/listarproyectoscontareas.component';

@Component({
  selector: 'app-proyectoscontareas',
  imports: [RouterOutlet, ListarproyectoscontareasComponent],
  templateUrl: './proyectoscontareas.component.html',
  styleUrl: './proyectoscontareas.component.css'
})
export class ProyectoscontareasComponent {
  constructor(public route:ActivatedRoute) {}
}
