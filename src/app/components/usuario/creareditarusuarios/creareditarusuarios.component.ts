import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { MatIconModule } from '@angular/material/icon';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';


@Component({
  selector: 'app-creareditarusuarios',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,MatIconModule
  ],
  templateUrl: './creareditarusuarios.component.html',
  styleUrl: './creareditarusuarios.component.css'
})
export class CreareditarusuariosComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  edicion: any;
  id: number = 0;
  showPassword = false;

  
  listapaises: { value: string; viewValue: string }[] = [
    { value: 'Peru', viewValue: 'Peru' },
    { value: 'Argentina', viewValue: 'Argentina' },
    { value: 'Chile', viewValue: 'Chile' },
    { value: 'Colombia', viewValue: 'Colombia' },
    { value: 'Venezuela', viewValue: 'Venezuela' },
    { value: 'España', viewValue: 'España' },
    { value: 'Portugal', viewValue: 'Portugal' },
    { value: 'Brazil', viewValue: 'Brazil' },
    { value: 'Paraguay', viewValue: 'Paraguay' },
    { value: 'Ecuador', viewValue: 'Ecuador' },
  
  ];
  

  constructor(
    private uS: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //Trae los datos
      this.init();
    });

    this.form = this.formBuilder.group({
      //Sin Validacion
      hid: [],
      husername: ['', Validators.required],
      hmail: ['', [Validators.required, Validators.email]],
      hpais:['', Validators.required],
      hpassword: ['',  [Validators.required, Validators.minLength(6)]],
      hfecha_modificacion: ['', Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      
      this.usuario.id = this.form.value.hid;
      this.usuario.username = this.form.value.husername;
      this.usuario.email = this.form.value.hmail;
      this.usuario.password = this.form.value.hpassword;
      this.usuario.pais=this.form.value.hpais;
      this.usuario.enabled = true;
      this.usuario.fecha_registro = this.usuario.fecha_registro;
      this.usuario.fecha_modificacion = this.form.value.hfecha_modificacion;
      if (this.edicion) {
        this.uS.update(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['usuarios']);
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id),
          hpassword:new FormControl(data.password),
          husername: new FormControl(data.username),
          hpais: new FormControl(data.pais),
          hmail: new FormControl(data.email),
          hfecha_modificacion: new FormControl(data.fecha_modificacion),
        });
      });
    }
  }

}
