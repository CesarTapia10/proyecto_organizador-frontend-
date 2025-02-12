import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportescomentarioComponent } from './reportescomentario/reportescomentario.component';

@Component({
  selector: 'app-reportes',
  imports: [RouterOutlet,ReportescomentarioComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route:ActivatedRoute){}
}
