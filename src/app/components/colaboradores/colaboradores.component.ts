import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcolaboradoresComponent } from './listarcolaboradores/listarcolaboradores.component';

@Component({
  selector: 'app-colaboradores',
  imports: [RouterOutlet, ListarcolaboradoresComponent],
  templateUrl: './colaboradores.component.html',
  styleUrl: './colaboradores.component.css'
})
export class ColaboradoresComponent {
  constructor(public route:ActivatedRoute) {}
}
