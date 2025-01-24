import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Colaboradores } from '../../../models/Colaboradores';
import { Usuario } from '../../../models/Usuario';
import { Proyectos } from '../../../models/Proyectos';
import { ColaboradoresService } from '../../../services/colaboradores.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { ProyectosService } from '../../../services/proyectos.service';

@Component({
  selector: 'app-creareditarcolaboradores',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creareditarcolaboradores.component.html',
  styleUrl: './creareditarcolaboradores.component.css'
})
export class CreareditarcolaboradoresComponent {
  form: FormGroup = new FormGroup({});
  colaboladores: Colaboradores = new Colaboradores();
  listarproyectos: Proyectos[]= [];
  listausuarios: Usuario[]= [];

  id: number = 0;
  edicion: boolean = false;

  listarepresentacion: { value: string; viewValue: string }[] = [
    { value: 'Lider', viewValue: 'Lider' },
    { value: 'desarrollador', viewValue: 'desarrollador' },
    { value: 'desarrollador 2', viewValue: 'desarrollador 2' },
    { value: 'investigador', viewValue: 'investigador' },
    { value: 'coordinador', viewValue: 'coordinador' },
    { value: 'especialista', viewValue: 'especialista' },
    { value: 'evaluador', viewValue: 'evaluador' },
    { value: 'El creativo', viewValue: 'El creativo' },
    { value: 'rematador', viewValue: 'rematador' },
    { value: 'implementador', viewValue: 'implementador' },
    { value: 'impulsor', viewValue: 'impulsor' },
    { value: 'productivo', viewValue: 'productivo' },
  ];

  constructor(
    private Cs: ColaboradoresService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private pS: ProyectosService
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
      hrepresentacion: ['', Validators.required],
      hproyectos: ['', Validators.required],
      hidusuario: ['', Validators.required],

      
    });
    this.uS.list().subscribe((data) =>{
      this.listausuarios=data;
    })
    this.pS.list().subscribe((data) =>{
      this.listarproyectos=data;
    })
  }
  insertar(): void {
    if (this.form.valid) {
      this.colaboladores.id= this.form.value.hid;
      this.colaboladores.representacion=this.form.value.hrepresentacion;
      this.colaboladores.proyectos.id=this.form.value.hproyectos;
      this.colaboladores.user.id=this.form.value.hidusuario;




      if (this.edicion) {
        this.Cs.update(this.colaboladores).subscribe((data) => {
          this.Cs.list().subscribe((data) => {
            this.Cs.setList(data);
          });
        });
      } else {
        this.Cs.insert(this.colaboladores).subscribe(data=>{
          this.Cs.list().subscribe(data=>{
            this.Cs.setList(data)
          })
        });
      }
     
      this.router.navigate(['colaboradores'])
    }

  }
  init() {
    if (this.edicion) {
      this.Cs.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({

          hid: new FormControl(data.id),
          hrepresentacion: new FormControl(data.representacion),
          hproyectos:  new FormControl(data.proyectos.nombre),
          hidusuario: new FormControl(data.user.username),
       

        });
      });
    }
  }
}
