import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Tareas } from '../../../models/Tareas';
import { TareasService } from '../../../services/tareas.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario';

@Component({
  selector: 'app-creareditar-tareas',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creareditar-tareas.component.html',
  styleUrl: './creareditar-tareas.component.css'
})
export class CreareditarTareasComponent {
  form: FormGroup = new FormGroup({});
  tarea: Tareas = new Tareas();
  listausuarios: Usuario[]= [];

  id: number = 0;
  edicion: boolean = false;
  

  estado: { value: string; viewValue: string }[] = [
    { value: 'realizado', viewValue: 'realizado' },
    { value: 'no realizado', viewValue: 'no realizado' },
  ];

  constructor(
    private tS: TareasService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService
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
      htitulo: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hestado: ['', Validators.required],
      hfecha_limite: ['', Validators.required],
      
      hfecha_actualizacion: ['', Validators.required],
      hidusuario: ['', Validators.required],
      
    });
    this.uS.list().subscribe((data) =>{
      this.listausuarios=data;
    })
  }
  insertar(): void {
    if (this.form.valid) {
      this.tarea.id= this.form.value.hid;
      this.tarea.titulo=this.form.value.htitulo;
      this.tarea.descripcion=this.form.value.hdescripcion;
      this.tarea.estado=this.form.value.hdescripcion;
      this.tarea.fecha_limite=this.form.value.hfecha_limite;
      this.tarea.fecha_creacion=new Date(Date.now());
      this.tarea.fecha_actualizacion=this.form.value.hfecha_actualizacion;
      this.tarea.user.id=this.form.value.hidusuario;



      if (this.edicion) {
        this.tS.update(this.tarea).subscribe((data) => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
        });
      } else {
        this.tS.insert(this.tarea).subscribe(data=>{
          this.tS.list().subscribe(data=>{
            this.tS.setList(data)
          })
        });
      }
      
      
    }
    this.router.navigate(['tareas'])
  }
  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({

          hid: new FormControl(data.id),
          htitulo: new FormControl(data.titulo),
          hdescripcion:  new FormControl(data.descripcion),
          hestado: new FormControl(data.estado),
          hfecha_limite:  new FormControl(data.fecha_limite),
          hfecha_creacion:  new FormControl(data.fecha_creacion),
          hfecha_actualizacion: new FormControl(data.fecha_actualizacion),
          hidusuario: new FormControl(data.user.username),

        });
      });
    }
  }
}
