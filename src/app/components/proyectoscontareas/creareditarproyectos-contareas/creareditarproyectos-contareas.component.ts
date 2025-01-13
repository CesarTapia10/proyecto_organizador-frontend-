import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProyectosconTareas } from '../../../models/ProyectosconTareas';
import { Usuario } from '../../../models/Usuario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { ProyectosconTareasService } from '../../../services/proyectoscon-tareas.service';
import { ProyectosService } from '../../../services/proyectos.service';
import { TareasService } from '../../../services/tareas.service';
import { Tareas } from '../../../models/Tareas';
import { Proyectos } from '../../../models/Proyectos';

@Component({
  selector: 'app-creareditarproyectos-contareas',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creareditarproyectos-contareas.component.html',
  styleUrl: './creareditarproyectos-contareas.component.css'
})
export class CreareditarproyectosContareasComponent {
  form: FormGroup = new FormGroup({});
  proyectoscontareas: ProyectosconTareas = new ProyectosconTareas();
  listausuarios: Usuario[]= [];
  listatareas: Tareas[]= [];
  listaproyectos: Proyectos[]=[];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private pT: ProyectosconTareasService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private pr: ProyectosService,
    private tr:TareasService
  ) {}
  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //trae los datos
      this.init();
    });

    this.form = this.formBuilder.group({
      hid:[''],
      hfecha_creacion: ['', Validators.required],
      hfecha_modifiacion: ['', Validators.required],
      hproyectos: ['', Validators.required],
      htareas: ['', Validators.required],
   
      
    });

    this.uS.list().subscribe((data) =>{
      this.listausuarios=data;
    });

    this.pr.list().subscribe((data) =>{
      this.listaproyectos=data;
    });

    this.tr.list().subscribe((data) =>{
      this.listatareas=data;
    })

   }
  insertar(): void {
    if (this.form.valid) {
      this.proyectoscontareas.id= this.form.value.hid;
      this.proyectoscontareas.fecha_creacion=this.form.value.hfecha_creacion;
      this.proyectoscontareas.fecha_modifiacion=this.form.value.hfecha_modifiacion;
      this.proyectoscontareas.proyectos=this.form.value.hproyectos;
      this.proyectoscontareas.tareas=this.form.value.htareas;
    



      if (this.edicion) {
        this.pT.update(this.proyectoscontareas).subscribe((data) => {
          this.pT.list().subscribe((data) => {
            this.pT.setList(data);
          });
        });

      } else {
        this.pT.insert(this.proyectoscontareas).subscribe(data=>{
          this.pT.list().subscribe(data=>{
            this.pT.setList(data)
          })
        });
      }
     
      
    }
    this.router.navigate(['Proyectos-tareas'])
  }
  init() {
    if (this.edicion) {
      this.pT.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({

          hid: new FormControl(data.id),
          hfecha_creacion: new FormControl(data.fecha_creacion),
          hfecha_modifiacion:  new FormControl(data.fecha_modifiacion),
          hproyectos: new FormControl(data.proyectos.nombre),
          htareas:  new FormControl(data.tareas.titulo),
    
   
        });
      });
    }
  }
}
