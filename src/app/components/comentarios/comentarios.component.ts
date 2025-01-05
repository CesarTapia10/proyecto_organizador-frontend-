import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcomentariosComponent } from './listarcomentarios/listarcomentarios.component';

@Component({
  selector: 'app-comentarios',
  imports: [RouterOutlet, ListarcomentariosComponent],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent {
  constructor(public route:ActivatedRoute) {}
}
