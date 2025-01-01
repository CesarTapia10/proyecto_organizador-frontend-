import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { LisarusuariosComponent } from './lisarusuarios/lisarusuarios.component';

@Component({
  selector: 'app-usuario',
  imports: [RouterOutlet, LisarusuariosComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  constructor(public route:ActivatedRoute){

  }
}
