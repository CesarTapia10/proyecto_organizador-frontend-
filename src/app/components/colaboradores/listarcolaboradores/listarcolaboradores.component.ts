import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Colaboradores } from '../../../models/Colaboradores';
import { ColaboradoresService } from '../../../services/colaboradores.service';

@Component({
  selector: 'app-listarcolaboradores',
  imports: [
    MatTableModule,
    MatIconModule, 
    RouterLink,
    MatPaginator
  ],
  templateUrl: './listarcolaboradores.component.html',
  styleUrl: './listarcolaboradores.component.css'
})
export class ListarcolaboradoresComponent implements OnInit{
  dataSource: MatTableDataSource<Colaboradores> = new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3','c4','eliminar','editar']

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: ColaboradoresService) {}

  ngOnInit(): void {
    this.cS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
    this.cS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
}
