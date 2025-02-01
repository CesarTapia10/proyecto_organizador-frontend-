import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Proyectos } from '../../../models/Proyectos';
import { ProyectosService } from '../../../services/proyectos.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarproyectos',
  imports: [
    MatTableModule,
     MatIconModule, 
     RouterLink,
     MatCardModule,
     CommonModule
  ],
  templateUrl: './listarproyectos.component.html',
  styleUrl: './listarproyectos.component.css'
})
export class ListarproyectosComponent implements OnInit {
  dataSource: MatTableDataSource<Proyectos> = new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3','c4', 'c5','eliminar','editar']



  constructor(private Ps: ProyectosService) {}

  ngOnInit(): void {
    this.Ps.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
    this.Ps.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);

  
    })
  }
  


  eliminar(id: number) {
    this.Ps.delete(id).subscribe((data) => {
      this.Ps.list().subscribe((data) => {
        this.Ps.setList(data);
      });
    });
  }
}
