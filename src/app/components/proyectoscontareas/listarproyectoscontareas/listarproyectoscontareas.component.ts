import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ProyectosconTareas } from '../../../models/ProyectosconTareas';
import { ProyectosconTareasService } from '../../../services/proyectoscon-tareas.service';

@Component({
  selector: 'app-listarproyectoscontareas',
  imports: [
    MatTableModule,
     MatIconModule, 
     RouterLink,
     MatPaginator
  ],
  templateUrl: './listarproyectoscontareas.component.html',
  styleUrl: './listarproyectoscontareas.component.css'
})
export class ListarproyectoscontareasComponent implements OnInit{
  dataSource: MatTableDataSource<ProyectosconTareas> = new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3','c4', 'c5','eliminar','editar']

  @ViewChild (MatPaginator) paginator!: MatPaginator;

  constructor(private pr: ProyectosconTareasService) {}

  ngOnInit(): void {
    this.pr.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.pr.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.pr.delete(id).subscribe((data) => {
      this.pr.list().subscribe((data) => {
        this.pr.setList(data);
      });
    });
  }
}
