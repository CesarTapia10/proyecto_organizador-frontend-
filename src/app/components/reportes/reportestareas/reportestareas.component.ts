import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { TareasService } from '../../../services/tareas.service';
Chart.register(...registerables)

@Component({
  selector: 'app-reportestareas',
  imports: [BaseChartDirective],
  templateUrl: './reportestareas.component.html',
  styleUrl: './reportestareas.component.css'
})
export class ReportestareasComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private Ts: TareasService) {}

  ngOnInit(): void {
    this.Ts.getcantidaddetareasreliadas().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.estado);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad),
          label: 'Total de estados de todas las tarea',
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
