import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Tareas } from '../../../models/Tareas';
import { TareasService } from '../../../services/tareas.service';

@Component({
  selector: 'app-listar-tareas',
  imports: [
     MatTableModule,
     MatIconModule, 
     RouterLink,
     MatPaginator
  ],
  templateUrl: './listar-tareas.component.html',
  styleUrl: './listar-tareas.component.css'
})
export class ListarTareasComponent implements OnInit {
  dataSource: MatTableDataSource<Tareas> = new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3','c4', 'c5', 'c6',
    'c7','c8','eliminar','editar']

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private Tr: TareasService) {}

  ngOnInit(): void {
    this.Tr.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.Tr.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.Tr.delete(id).subscribe((data) => {
      this.Tr.list().subscribe((data) => {
        this.Tr.setList(data);
      });
    });
  }
  
}
