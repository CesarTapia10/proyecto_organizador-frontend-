import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarTareasComponent } from './listar-tareas/listar-tareas.component';

@Component({
  selector: 'app-tareas',
  imports: [RouterOutlet, ListarTareasComponent],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent {
  constructor(public route:ActivatedRoute) {}
}
