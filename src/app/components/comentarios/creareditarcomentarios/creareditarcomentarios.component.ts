import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { comentarios } from '../../../models/comentarios';
import { Usuario } from '../../../models/Usuario';
import { Tareas } from '../../../models/Tareas';
import { ComentariosService } from '../../../services/comentarios.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { TareasService } from '../../../services/tareas.service';

@Component({
  selector: 'app-creareditarcomentarios',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creareditarcomentarios.component.html',
  styleUrl: './creareditarcomentarios.component.css'
})
export class CreareditarcomentariosComponent {
  form: FormGroup = new FormGroup({});
  comentarios: comentarios = new comentarios();
  listausuarios: Usuario[]= [];
  listartarea:Tareas[]=[];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private cS: ComentariosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private tS:TareasService
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
      hcontenido: ['', Validators.required],
      hfecha_creacion: ['', Validators.required],
      htareas: ['', Validators.required],
      huser: ['', Validators.required],
      
      
    });
    this.uS.list().subscribe((data) =>{
      this.listausuarios=data;
    })
    this.tS.list().subscribe((data) =>{
      this.listartarea=data;
    })
  }
  insertar(): void {
    if (this.form.valid) {
      this.comentarios.id= this.form.value.hid;
      this.comentarios.contenido=this.form.value.hcontenido;
      this.comentarios.fecha_creacion=this.comentarios.fecha_creacion;
      this.comentarios.tareas.id=this.form.value.htareas;
      this.comentarios.user.id=this.form.value.huser;
     



      if (this.edicion) {
        this.cS.update(this.comentarios).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        this.cS.insert(this.comentarios).subscribe(data=>{
          this.cS.list().subscribe(data=>{
            this.cS.setList(data)
          })
        });
      }
     
      
    }
    this.router.navigate(['comentarios'])
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({

          hid: new FormControl(data.id),
          hcontenido: new FormControl(data.contenido),
          hfecha_creacion:  new FormControl(data.fecha_creacion),
          htareas: new FormControl(data.tareas.titulo),
          huser:  new FormControl(data.user.username),
        });
      });
    }
  }
}
