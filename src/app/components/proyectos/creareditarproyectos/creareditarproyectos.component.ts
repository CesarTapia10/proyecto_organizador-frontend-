import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Proyectos } from '../../../models/Proyectos';
import { ProyectosService } from '../../../services/proyectos.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-creareditarproyectos',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creareditarproyectos.component.html',
  styleUrl: './creareditarproyectos.component.css'
})
export class CreareditarproyectosComponent {
  form: FormGroup = new FormGroup({});
  proyectos: Proyectos = new Proyectos();


  id: number = 0;
  edicion: boolean = false;

  constructor(
    private pS: ProyectosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

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
      hnombre: ['', Validators.required],
      hdecripcion: ['', Validators.required],
      hfecha_creacion: ['', Validators.required],
      hfecha_modifiacion: ['', Validators.required],
   
   
      
    });

 
    

   }
  insertar(): void {
    if (this.form.valid) {
      this.proyectos.id= this.form.value.hid;
      this.proyectos.nombre=this.form.value.hnombre;
      this.proyectos.decripcion=this.form.value.hdecripcion;
      this.proyectos.fecha_creacion=this.form.value.hfecha_creacion;
      this.proyectos.fecha_modifiacion=this.form.value.hfecha_modifiacion;

    



      if (this.edicion) {
        this.pS.update(this.proyectos).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });

      } else {
        this.pS.insert(this.proyectos).subscribe(data=>{
          this.pS.list().subscribe(data=>{
            this.pS.setList(data)
          })
        });
      }
     
      
    }
    this.router.navigate(['Proyectos'])
  }
  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({

          hid: new FormControl(data.id),
          hnombre: new FormControl(data.nombre),
          hdecripcion:  new FormControl(data.decripcion),
          hfecha_creacion: new FormControl(data.fecha_creacion),
          hfecha_modifiacion:  new FormControl(data.fecha_modifiacion),
    
   
        });
      });
    }
  }
}
