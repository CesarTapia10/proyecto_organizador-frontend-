import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { roles } from '../../../models/roles';
import { MatSort } from '@angular/material/sort';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-listarroles',
  imports: [MatTableModule, 
    CommonModule,
     RouterLink,
     MatIconModule,
      MatPaginator],
  templateUrl: './listarroles.component.html',
  styleUrl: './listarroles.component.css'
})
export class ListarrolesComponent implements OnInit{
  dataSource: MatTableDataSource<roles> = new MatTableDataSource();
  displayedColumns: String[] = ['c1', 'c2', 'c3', 'c4'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private rS: RolesService) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe((data)=>{
      this.dataSource=  new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
}
