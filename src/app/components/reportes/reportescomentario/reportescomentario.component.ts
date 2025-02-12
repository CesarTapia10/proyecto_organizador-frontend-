import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ComentariosComponent } from '../../comentarios/comentarios.component';
import { ComentariosService } from '../../../services/comentarios.service';

@Component({
  selector: 'app-reportescomentario',
  imports: [BaseChartDirective],
  templateUrl: './reportescomentario.component.html',
  styleUrl: './reportescomentario.component.css'
})
export class ReportescomentarioComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private Cc: ComentariosService) {}

  ngOnInit(): void {
    this.Cc.getcantidaddecomentariosporusuario().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.username);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad_comentarios),
          label: 'Total de comentarios por usuario',
          backgroundColor: [
            "#4B0082",  
            "#6A0DAD",  
            "#8A2BE2",  
            "#9370DB",  
            "#BA55D3",  
            "#DA70D6",  
            "#E6A8D7", 
            "#D8BFD8",  
            "#663399", 
            "#9400D3" 
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
